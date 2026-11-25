import Link from "next/link";
import { AuthForm } from "@/app/components";
export default function SignInPage(){return <main className="auth-shell"><div className="eyebrow"><i/>Welcome back</div><section className="auth-card"><h1>Pick up where<br/>you left off.</h1><p>Sign in to keep your opportunities, progress, and people in one place.</p><AuthForm mode="sign-in"/><p className="auth-switch">New to Mee-Eain? <Link href="/auth/sign-up">Create an account</Link></p></section></main>}
