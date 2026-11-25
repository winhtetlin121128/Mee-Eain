import { redirect } from "next/navigation";
import { getProfileData,getViewer } from "@/lib/data";
import { ActionTabs } from "@/app/admin-components";
import { CheckIn,ProfileEditor,SignOutButton } from "@/app/components";
import { checkInToday,syncProfile,updateProfile } from "@/app/actions";
export const dynamic="force-dynamic";
export default async function ProfilePage(){
 const u=await getViewer();if(!u)redirect("/auth/sign-in");
 if(!process.env.DATABASE_URL)return <main className="dashboard"><div className="eyebrow"><i/>Your space</div><h1 className="page-title">Welcome, {u.name}.</h1><p className="muted">Your account is signed in. Add DATABASE_URL and push the schema to open your profile, streak tracker, and saved listings.</p><div className="panel" style={{marginTop:22}}><div className="detail"><span>Neon Auth ID</span><strong className="mono">{u.id}</strong></div></div></main>;
 let data=await getProfileData(u.id);if(!data){await syncProfile(u.name??"Student","","");data=await getProfileData(u.id)}
 if(!data)throw new Error("Could not load your Mee-Eain profile.");
 const{viewer,actions}=data,history=viewer.checkinHistory??[];
 return <main className="dashboard"><div className="dashboard-top"><div><div className="eyebrow"><i/>Your space</div><h1>Welcome, {viewer.name.split(" ")[0]}.</h1><div className="auth-user">{viewer.email} · <span className="mono">{viewer.role.toUpperCase()}</span></div></div><SignOutButton/></div><div className="dashboard-grid"><section className="panel"><h2 className="panel-title">Account overview</h2><div className="profile-details"><div className="detail"><span>Full name</span><strong>{viewer.name}</strong></div><div className="detail"><span>Email</span><strong>{viewer.email}</strong></div><div className="detail"><span>Neon Auth ID</span><strong className="mono" style={{fontSize:9}}>{viewer.id}</strong></div><div className="detail"><span>Role</span><strong>{viewer.role}</strong></div></div><ProfileEditor university={viewer.university} major={viewer.major} onSave={updateProfile}/></section><section className="panel"><h2 className="panel-title">Your learning streak</h2><CheckIn history={history} streak={viewer.currentStreak} onCheckIn={checkInToday}/></section></div><ActionTabs rows={actions.map(a=>({action:{id:a.action.id,actionType:a.action.actionType},post:{...a.post,locationOrLink:a.post.locationOrLink??""}}))}/></main>;
}
