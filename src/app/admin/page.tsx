import Link from "next/link";
import { getAdminData } from "@/lib/data";

export default async function AdminOverviewPage() {
  const { people, listings, applicationCount } = await getAdminData();
  return <div className="admin-page">
    <header className="dashboard-top admin-heading" id="overview"><div><div className="eyebrow"><i/>Mee-Eain operations</div><h1>The admin desk.</h1><p className="muted">A quick overview of posts, users, and activity.</p></div></header>
    <div className="kpis"><div className="kpi"><strong>{people.length}</strong><span>Total users</span></div><div className="kpi"><strong>{listings.length}</strong><span>Total posts</span></div><div className="kpi"><strong>{applicationCount}</strong><span>Applications</span></div><div className="kpi"><strong>{listings.filter(p => p.isPinned).length}</strong><span>Pinned posts</span></div></div>
    <div className="admin-quick-links"><Link href="/admin/posts" className="panel admin-quick-card"><span className="eyebrow">POST MANAGEMENT</span><strong>Manage posts ↗</strong><span className="muted">Create, edit, and remove home page listings.</span></Link><Link href="/admin/users" className="panel admin-quick-card"><span className="eyebrow">USER MANAGEMENT</span><strong>Manage users ↗</strong><span className="muted">Review accounts and update student or admin access.</span></Link></div>
    <section className="panel admin-recent"><div className="admin-section-head"><div><h2 className="panel-title">Recent posts</h2><p className="muted">Latest listings in the database.</p></div><Link href="/admin/posts" className="admin-text-link">View all posts ↗</Link></div>
      <div className="admin-recent-list">{listings.slice(0, 5).map(post => <div className="admin-recent-row" key={post.id}><div><strong>{post.title}</strong><span>{post.organization} · {post.category}</span></div><span className="mono muted">{post.deadline ?? post.eventDate ?? "OPEN"}</span></div>)}{listings.length === 0 && <p className="muted">No posts yet. Add your first one from the Posts page.</p>}</div>
    </section>
  </div>;
}
