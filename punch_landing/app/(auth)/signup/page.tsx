"use client";
import { useState } from "react";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "@/app/firebase";
import OnboardRestaurant from "@/components/OnboardRestaurant";
import { useRouter } from "next/navigation";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOnboard, setShowOnboard] = useState(false);
  const [pendingAccount, setPendingAccount] = useState<{ email: string; password: string; name: string; phone: string } | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    // Do NOT create user yet; move to onboarding first
    setPendingAccount({ email, password, name, phone });
    setShowOnboard(true);
  };

  const handleOnboardingComplete = async (restaurantValues: any) => {
    if (!pendingAccount) return;
    setLoading(true);
    setError("");
    try {
      // 1) Create the auth user now that onboarding is done
      const cred = await createUserWithEmailAndPassword(auth, pendingAccount.email, pendingAccount.password);

      // 2) If a logo file was selected, upload it now with authenticated user
      let finalLogoUrl = restaurantValues.logoUrl || "";
      if (restaurantValues.logoFile) {
        const file: File = restaurantValues.logoFile as File;
        const ext = file.name.split(".").pop() || "png";
        const path = `business-logos/${cred.user.uid}/logo_${Date.now()}.${ext}`;
        const fileRef = ref(storage, path);
        const snap = await uploadBytes(fileRef, file, { contentType: file.type });
        finalLogoUrl = await getDownloadURL(snap.ref);
      }

      // 3) Persist restaurant document with owner UID and collected values
      await addDoc(collection(db, "restaraunts"), {
        ...restaurantValues,
        logoUrl: finalLogoUrl,
        logoFile: undefined,
        owner: cred.user.uid,
        ownerName: pendingAccount.name,
        ownerPhone: pendingAccount.phone,
        createdAt: new Date(),
      });

      // 4) Navigate to dashboard
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to create account");
      setShowOnboard(false);
    } finally {
      setLoading(false);
    }
  };

  if (showOnboard) {
    return (
      <div>
        <OnboardRestaurant onComplete={handleOnboardingComplete} />
        {loading && <div className="mt-4 text-gray-700 text-sm">Finishing setup...</div>}
        {error && <div className="mt-2 text-red-600 text-sm">{error}</div>}
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Create your account</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="name">Full name</label>
            <input id="name" className="form-input w-full py-2" type="text" placeholder="Corey Barker" required value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
            <input id="email" className="form-input w-full py-2" type="email" placeholder="corybarker@email.com" required value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="phone">Phone</label>
            <input id="phone" className="form-input w-full py-2" type="text" placeholder="(+750) 932-8907" required value={phone} onChange={e => setPhone(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
            <input id="password" className="form-input w-full py-2" type="password" autoComplete="on" placeholder="••••••••" required value={password} onChange={e => setPassword(e.target.value)} />
          </div>
        </div>
        {error && <div className="mt-4 text-red-600 text-sm">{error}</div>}
        <div className="mt-6 space-y-3">
          <button className="btn w-full bg-[#FB7A20] text-white shadow-sm hover:bg-[#e66a1a]" type="submit" disabled={loading}>{loading ? "Registering..." : "Continue"}</button>
        </div>
      </form>
      <div className="mt-4 text-center">
        <span className="text-sm text-gray-700">Already have an account? </span>
        <Link className="text-sm text-[#FB7A20] underline hover:no-underline" href="/login">Sign in</Link>
      </div>
    </div>
  );
}
