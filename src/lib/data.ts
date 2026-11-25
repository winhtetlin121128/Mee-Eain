import "server-only";
import { desc,eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { getDb } from "@/db";
import { posts,userPostActions,users } from "@/db/schema";
export const demoPosts=[
{id:"00000000-0000-4000-8000-000000000001",title:"Build what matters: Mee-Eain Community Demo Day",category:"announcement" as const,summary:"A showcase of student-built projects, with mentors from across the region. Bring a prototype, a question, or just your curiosity.",organization:"Mee-Eain",locationOrLink:"Yangon Innovation Hub",eventDate:"2026-12-12",deadline:null,isPinned:true,createdBy:"demo",createdAt:new Date()},
{id:"00000000-0000-4000-8000-000000000002",title:"Portfolio reviews that open doors",category:"webinar" as const,summary:"A practical, live walkthrough of what early-career teams look for in a student portfolio.",organization:"Design For Change",locationOrLink:"Online · Zoom",eventDate:"2026-12-08",deadline:null,isPinned:false,createdBy:"demo",createdAt:new Date()},
{id:"00000000-0000-4000-8000-000000000003",title:"Mee-Eain study circle: learning in public",category:"meetup" as const,summary:"An informal evening for students to share a current challenge and trade ideas with peers.",organization:"Mee-Eain Student Network",locationOrLink:"The Pansodan, Yangon",eventDate:"2026-12-17",deadline:null,isPinned:false,createdBy:"demo",createdAt:new Date()},
{id:"00000000-0000-4000-8000-000000000004",title:"Product research intern — 2027 intake",category:"internship" as const,summary:"Help a small product team make education tools more useful through interviews, synthesis, and rapid experiments.",organization:"Thitsa Labs",locationOrLink:"Hybrid · Yangon",eventDate:null,deadline:"2027-01-15",isPinned:false,createdBy:"demo",createdAt:new Date()},
{id:"00000000-0000-4000-8000-000000000005",title:"Volunteer tutors for the next cohort",category:"volunteer" as const,summary:"Support high-school learners with a weekly hour of practical maths, writing, or digital skills mentoring.",organization:"Open Door Learning",locationOrLink:"Online or in person",eventDate:null,deadline:"2026-12-22",isPinned:false,createdBy:"demo",createdAt:new Date()}
];
export async function getViewer(){if(!auth)return null;const{data}=await auth.getSession();return data?.user??null}
const fallbackHomeData={posts:demoPosts,stats:{users:1248,active:86,upcoming:12},actions:[] as {postId:string;actionType:"saved"|"applied"}[]};
export async function getPublicListings(){
 if(!process.env.DATABASE_URL)return demoPosts;
 try{
  const allPosts=await getDb().select().from(posts).orderBy(desc(posts.isPinned),desc(posts.createdAt));
  const today=new Date().toISOString().slice(0,10);
  return allPosts.filter(post=>{const end=post.deadline??post.eventDate;return !end||end>=today});
 }catch{return demoPosts}
}
export async function getHomeData(viewerId?:string){
 if(!process.env.DATABASE_URL)return fallbackHomeData;
 const livePosts=await getPublicListings(),db=getDb(),today=new Date().toISOString().slice(0,10);
 const [people,actions]=await Promise.all([
  db.select({id:users.id}).from(users).catch(()=>null),
  viewerId?db.select({postId:userPostActions.postId,actionType:userPostActions.actionType}).from(userPostActions).where(eq(userPostActions.userId,viewerId)).catch(()=>[]):Promise.resolve([])
 ]);
 return{posts:livePosts,stats:{users:people?.length??fallbackHomeData.stats.users,active:livePosts.length,upcoming:livePosts.filter(post=>post.eventDate&&post.eventDate>=today).length},actions};
}
export async function getProfileData(id:string){
 const db=getDb(),[viewer]=await db.select().from(users).where(eq(users.id,id)).limit(1);if(!viewer)return null;
 const actions=await db.select({action:userPostActions,post:posts}).from(userPostActions).innerJoin(posts,eq(posts.id,userPostActions.postId)).where(eq(userPostActions.userId,id)).orderBy(desc(userPostActions.createdAt));
 return{viewer,actions};
}
export async function getAdminData(){
 const db=getDb();const[people,listings,actions]=await Promise.all([db.select().from(users).orderBy(desc(users.createdAt)),db.select().from(posts).orderBy(desc(posts.createdAt)),db.select().from(userPostActions)]);
 return{people,listings,applicationCount:actions.filter(a=>a.actionType==="applied").length};
}
