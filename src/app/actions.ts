"use server";
import { and,eq,sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { getDb } from "@/db";
import { posts,userPostActions,users } from "@/db/schema";
async function currentUser(){if(!auth)throw new Error("Authentication is not configured. Set NEON_AUTH_BASE_URL and NEON_AUTH_COOKIE_SECRET in the deployment environment.");const{data}=await auth.getSession();if(!data?.user)redirect("/auth/sign-in");return data.user}
async function ensureProfile(u:{id:string;name:string;email:string}){
 const db=getDb();await db.insert(users).values({id:u.id,name:u.name,email:u.email}).onConflictDoNothing();
 const[p]=await db.select().from(users).where(eq(users.id,u.id)).limit(1);return p;
}
export async function syncProfile(name:string,university:string,major:string,adminCode?:string){
 if(!auth)throw new Error("Authentication is not configured. Set NEON_AUTH_BASE_URL and NEON_AUTH_COOKIE_SECRET in the deployment environment.");const{data}=await auth.getSession();if(!data?.user)throw new Error("Sign in to finish creating your profile.");
 const db=getDb(),isAdmin=!!adminCode&&!!process.env.DEMO_ADMIN_BOOTSTRAP_CODE&&adminCode===process.env.DEMO_ADMIN_BOOTSTRAP_CODE;
 await db.insert(users).values({id:data.user.id,name:name||data.user.name||"Student",email:data.user.email,university,major,role:isAdmin?"admin":"student"}).onConflictDoUpdate({target:users.id,set:{name:name||data.user.name||"Student",university,major}});
 return{ok:true};
}
export async function togglePostAction(postId:string,kind:"saved"|"applied"){
 const u=await currentUser(),profile=await ensureProfile(u),db=getDb();
 const[existing]=await db.select().from(userPostActions).where(and(eq(userPostActions.userId,profile.id),eq(userPostActions.postId,postId),eq(userPostActions.actionType,kind))).limit(1);
 if(existing)await db.delete(userPostActions).where(eq(userPostActions.id,existing.id));else await db.insert(userPostActions).values({userId:profile.id,postId,actionType:kind}).onConflictDoNothing();
 revalidatePath("/");revalidatePath("/profile");return{active:!existing};
}
export async function checkInToday(){
 const u=await currentUser(),profile=await ensureProfile(u),db=getDb();
 const today=new Date().toISOString().slice(0,10),yesterday=new Date(Date.now()-86400000).toISOString().slice(0,10);
 const result=await db.execute(sql`UPDATE users SET
 current_streak=CASE WHEN checkin_history @> jsonb_build_array(${yesterday}) THEN current_streak+1 ELSE 1 END,
 last_checkin_at=now(),checkin_history=checkin_history || jsonb_build_array(${today})
 WHERE id=${profile.id} AND NOT (checkin_history @> jsonb_build_array(${today}))
 RETURNING current_streak`);
 const row=result.rows[0] as {current_streak:number}|undefined;
 revalidatePath("/profile");
 if(!row){const[current]=await db.select({streak:users.currentStreak}).from(users).where(eq(users.id,profile.id)).limit(1);return{ok:true,already:true,streak:current?.streak??profile.currentStreak}}
 return{ok:true,already:false,streak:row.current_streak};
}
export async function updateProfile(formData:FormData){
 const u=await currentUser(),profile=await ensureProfile(u);
 const university=z.string().trim().max(160).parse(formData.get("university")??"");
 const major=z.string().trim().max(160).parse(formData.get("major")??"");
 await getDb().update(users).set({university,major}).where(eq(users.id,profile.id));revalidatePath("/profile");
}
const postInput=z.object({title:z.string().trim().min(5).max(120),category:z.enum(["announcement","hackathon","webinar","event","meetup","internship","volunteer"]),summary:z.string().trim().min(15).max(800),organization:z.string().trim().min(2).max(120),locationOrLink:z.string().trim().max(200),eventDate:z.string().optional(),deadline:z.string().optional(),isPinned:z.boolean()});
export async function publishPost(formData:FormData){
 const u=await currentUser(),p=await ensureProfile(u);if(p.role!=="admin")throw new Error("Admin access required.");
 const v=postInput.parse({title:formData.get("title"),category:formData.get("category"),summary:formData.get("summary"),organization:formData.get("organization"),locationOrLink:formData.get("locationOrLink"),eventDate:formData.get("eventDate")||undefined,deadline:formData.get("deadline")||undefined,isPinned:formData.get("isPinned")==="on"});
 if(v.isPinned&&v.category!=="announcement")throw new Error("Only announcements can be pinned.");
 await getDb().insert(posts).values({...v,eventDate:v.eventDate||null,deadline:v.deadline||null,createdBy:p.id});revalidatePath("/");revalidatePath("/admin");revalidatePath("/admin/posts");
}
export async function updatePost(formData:FormData){
 const u=await currentUser(),p=await ensureProfile(u);if(p.role!=="admin")throw new Error("Admin access required.");
 const id=z.string().min(1).max(128).parse(formData.get("postId"));
 const v=postInput.parse({title:formData.get("title"),category:formData.get("category"),summary:formData.get("summary"),organization:formData.get("organization"),locationOrLink:formData.get("locationOrLink"),eventDate:formData.get("eventDate")||undefined,deadline:formData.get("deadline")||undefined,isPinned:formData.get("isPinned")==="on"});
 if(v.isPinned&&v.category!=="announcement")throw new Error("Only announcements can be pinned.");
 await getDb().update(posts).set({...v,eventDate:v.eventDate||null,deadline:v.deadline||null}).where(eq(posts.id,id));
 revalidatePath("/");revalidatePath("/admin");revalidatePath("/admin/posts");
}
export async function deletePost(id:string){
 const u=await currentUser(),p=await ensureProfile(u);if(p.role!=="admin")throw new Error("Admin access required.");
 await getDb().delete(posts).where(eq(posts.id,id));revalidatePath("/");revalidatePath("/admin");revalidatePath("/admin/posts");
}
export async function updateUserRole(userId:string,role:"student"|"admin"){
 const u=await currentUser(),p=await ensureProfile(u);if(p.role!=="admin")throw new Error("Admin access required.");
 const id=z.string().min(1).max(128).parse(userId),nextRole=z.enum(["student","admin"]).parse(role);
 if(id===u.id)throw new Error("You cannot change your own role.");
 await getDb().update(users).set({role:nextRole}).where(eq(users.id,id));revalidatePath("/admin");revalidatePath("/admin/users");
}
export async function removeAction(id:string){
 const u=await currentUser(),p=await ensureProfile(u);
 await getDb().delete(userPostActions).where(and(eq(userPostActions.id,id),eq(userPostActions.userId,p.id)));revalidatePath("/profile");
}
