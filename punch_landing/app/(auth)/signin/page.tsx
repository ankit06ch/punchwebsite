"use client";
import { useState } from "react";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/waitlist");
    } catch (err: any) {
      setError(err.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Sign in to your account</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
            <input id="email" className="form-input w-full py-2" type="email" placeholder="corybarker@email.com" required value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
            <input id="password" className="form-input w-full py-2" type="password" autoComplete="on" placeholder="••••••••" required value={password} onChange={e => setPassword(e.target.value)} />
          </div>
        </div>
        {error && <div className="mt-4 text-red-600 text-sm">{error}</div>}
        <div className="mt-6">
          <button className="btn w-full bg-[#FB7A20] text-white shadow-sm hover:bg-[#e66a1a]" type="submit" disabled={loading}>{loading ? "Signing in..." : "Sign In"}</button>
        </div>
      </form>
      <div className="mt-6 text-center">
        <Link className="text-sm text-gray-700 underline hover:no-underline" href="/reset-password">Forgot password</Link>
      </div>
      <div className="mt-4 text-center">
        <span className="text-sm text-gray-700">New to Punch? </span>
        <Link className="text-sm text-[#FB7A20] underline hover:no-underline" href="/signup">Create an account</Link>
      </div>
    </div>
  );
}
