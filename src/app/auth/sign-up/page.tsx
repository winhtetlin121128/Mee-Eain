import Link from "next/link";
import { AuthForm } from "@/app/components";
export default function SignUpPage(){return <main className="auth-shell"><div className="eyebrow"><i/>A good next step</div><section className="auth-card"><h1>There’s a place<br/>for you here.</h1><p>Create your student account to save opportunities and track your learning.</p><AuthForm mode="sign-up"/><p className="auth-switch">Already part of Mee-Eain? <Link href="/auth/sign-in">Sign in</Link></p></section></main>}
