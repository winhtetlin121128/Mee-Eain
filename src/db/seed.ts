import { config } from "dotenv";
config({path:".env.local"});
config();
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { users,posts } from "./schema";

if(!process.env.DATABASE_URL||!process.env.NEON_AUTH_BASE_URL)throw new Error("Set DATABASE_URL and NEON_AUTH_BASE_URL before seeding.");
const db=drizzle(neon(process.env.DATABASE_URL),{schema:{users,posts}});
const authBase=process.env.NEON_AUTH_BASE_URL.replace(/\/$/,"");
async function createDemo(name:string,email:string,password:string):Promise<{id:string}>{
 const base={name,email,password};
 const signup=await fetch(authBase+"/sign-up/email",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(base)});
 if(signup.ok){const payload=await signup.json() as {user?:{id:string};id?:string};const id=payload.user?.id??payload.id;if(id)return{id}}
 const signin=await fetch(authBase+"/sign-in/email",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({email,password})});
 if(!signin.ok){const detail=await signin.text();throw new Error(`Neon Auth could not create or sign in ${email} (${signin.status}): ${detail.slice(0,240)}`)}
 const payload=await signin.json() as {user?:{id:string};id?:string};const id=payload.user?.id??payload.id;
 if(!id)throw new Error("Neon Auth signup/sign-in did not return a user ID.");
 return{id};
}
async function main(){
 const[student,admin]=await Promise.all([
 createDemo("Maya Student","maya.student@nexuslearn.demo",process.env.DEMO_STUDENT_PASSWORD||"StudentDemo2026!"),
 createDemo("Aung Admin","aung.admin@nexuslearn.demo",process.env.DEMO_ADMIN_PASSWORD||"AdminDemo2026!")
 ]);
 await db.insert(users).values({id:student.id,name:"Maya Student",email:"maya.student@nexuslearn.demo",role:"student",university:"University of Yangon",major:"Information Technology"}).onConflictDoUpdate({target:users.id,set:{role:"student",name:"Maya Student",university:"University of Yangon",major:"Information Technology"}});
 await db.insert(users).values({id:admin.id,name:"Aung Admin",email:"aung.admin@nexuslearn.demo",role:"admin",university:"Yangon Technological University",major:"Computer Engineering"}).onConflictDoUpdate({target:users.id,set:{role:"admin",name:"Aung Admin",university:"Yangon Technological University",major:"Computer Engineering"}});
 const sample=[
 {title:"Build what matters: Mee-Eain Community Demo Day",category:"announcement" as const,summary:"A showcase of student-built projects, with mentors from across the region. Bring a prototype, a question, or just your curiosity.",organization:"Mee-Eain",locationOrLink:"Yangon Innovation Hub",eventDate:"2026-12-12",deadline:null,isPinned:true,createdBy:admin.id},
 {title:"Portfolio reviews that open doors",category:"webinar" as const,summary:"A practical, live walkthrough of what early-career teams look for in a student portfolio.",organization:"Design For Change",locationOrLink:"Online · Zoom",eventDate:"2026-12-08",deadline:null,isPinned:false,createdBy:admin.id},
 {title:"Mee-Eain study circle: learning in public",category:"meetup" as const,summary:"An informal evening for students to share a current challenge and trade ideas with peers.",organization:"Mee-Eain Student Network",locationOrLink:"The Pansodan, Yangon",eventDate:"2026-12-17",deadline:null,isPinned:false,createdBy:admin.id},
 {title:"Product research intern — 2027 intake",category:"internship" as const,summary:"Help a small product team improve education tools through interviews, synthesis, and rapid experiments.",organization:"Thitsa Labs",locationOrLink:"Hybrid · Yangon",eventDate:null,deadline:"2027-01-15",isPinned:false,createdBy:admin.id},
 {title:"Volunteer tutors for the next cohort",category:"volunteer" as const,summary:"Support high-school learners with a weekly hour of practical maths, writing, or digital skills mentoring.",organization:"Open Door Learning",locationOrLink:"Online or in person",eventDate:null,deadline:"2026-12-22",isPinned:false,createdBy:admin.id}
 ];
 for(const post of sample){const[old]=await db.select({id:posts.id}).from(posts).where(eq(posts.title,post.title)).limit(1);if(old)await db.update(posts).set(post).where(eq(posts.id,old.id));else await db.insert(posts).values(post)}
 console.log("Demo accounts ready:");
 console.log("Student: maya.student@nexuslearn.demo / "+(process.env.DEMO_STUDENT_PASSWORD||"StudentDemo2026!"));
 console.log("Admin: aung.admin@nexuslearn.demo / "+(process.env.DEMO_ADMIN_PASSWORD||"AdminDemo2026!"));
}
main().catch(e=>{console.error(e);process.exitCode=1});
