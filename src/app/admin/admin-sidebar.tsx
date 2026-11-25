"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/admin", label: "Overview", icon: "◫" },
  { href: "/admin/posts", label: "Posts", icon: "▤" },
  { href: "/admin/users", label: "Users", icon: "♙" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  return <aside className="admin-sidebar">
    <Link href="/admin" className="admin-sidebar-brand"><span className="admin-sidebar-mark">M</span><span><strong>MEE-EAIN</strong><small>ADMIN CONSOLE</small></span></Link>
    <nav className="admin-sidebar-nav" aria-label="Admin menu">
      <p className="eyebrow">Workspace</p>
      {items.map(item => {
        const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(`${item.href}/`));
        return <Link key={item.href} href={item.href} className={active ? "active" : undefined} aria-current={active ? "page" : undefined}>
          <span className="admin-nav-icon" aria-hidden="true">{item.icon}</span>{item.label}
        </Link>;
      })}
    </nav>
    <Link href="/" className="admin-sidebar-back">↗ <span>Back to website</span></Link>
    <div className="admin-sidebar-footer"><span className="admin-status-dot"/>Neon database connected</div>
  </aside>;
}
