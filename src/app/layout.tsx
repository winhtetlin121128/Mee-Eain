import type { Metadata } from "next";
import Link from "next/link";
import { Inter,JetBrains_Mono } from "next/font/google";
import { SiteNav } from "./site-nav";
import "./globals.css";
const inter=Inter({subsets:["latin"],variable:"--font-inter"});
const mono=JetBrains_Mono({subsets:["latin"],variable:"--font-mono"});
export const metadata:Metadata={title:"Mee-Eain — Find your next step",description:"A thoughtful home for student opportunities, learning, and community."};
export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="en"><body className={`${inter.variable} ${mono.variable}`}><header className="site-header"><Link href="/" className="brand"><span className="brand-mark">M</span><span>MEE-EAIN</span></Link><SiteNav/></header>{children}<footer className="site-footer"><Link href="/" className="brand"><span className="brand-mark">M</span><span>MEE-EAIN</span></Link><span>Make the next step yours.</span><span className="mono">YANGON · EST. 2026</span></footer></body></html>;
}
