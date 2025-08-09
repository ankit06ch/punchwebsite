"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "@/app/firebase";
import OnboardRestaurant from "@/components/OnboardRestaurant";
import { useRouter } from "next/navigation";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Normalize to a single schema. Any missing optional values become null.
function normalizeRestaurantDoc(input: any, ownerUid: string, ownerName: string, ownerPhone: string, logoUrl: string) {
  const base = {
    name: input?.name ?? null,
    cuisines: Array.isArray(input?.cuisines) ? input.cuisines : input?.cuisine ? [input.cuisine] : [],
    price: input?.price ?? null,
    location: input?.location ?? null,
    coordinates: input?.coordinates ?? null, // { lat, lon } or null
    hours: input?.hours ?? null,             // map of day->string or null
    logoUrl: logoUrl || null,
    timezone: input?.timezone ?? null,
    // Owner/meta
    owner: ownerUid,
    ownerName: ownerName ?? null,
    ownerPhone: ownerPhone ?? null,
    createdAt: new Date(),
  } as any;

  // Force-null undefined so Firestore doesn't reject
  Object.keys(base).forEach((k) => {
    if (base[k] === undefined) base[k] = null;
  });
  return base;
}

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

  // Friendly rotating messages with a simple typewriter effect
  const messages = useMemo(
    () => [
      "Our rewards are loading… unlike your laundry, these points fold themselves.",
      "Patience pays… literally. Points incoming!",
      "Good things take time… great rewards take just a few seconds more.",
      "We’re cooking up your points… they smell like free coffee.",
      "Your loyalty points are doing a victory lap before arriving.",
      "Almost there… just bribing the server with cookies.",
      "Loading… because instant gratification isn’t as fun.",
      "Hang tight… our hamsters are running as fast as they can.",
      "Please wait… your rewards are finding a Wi‑Fi signal.",
      "Progress bar sponsored by your patience.",
    ],
    []
  );
  const [typed, setTyped] = useState("");
  const [msgIndex, setMsgIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");
  const typingRef = useRef<number | null>(null);

  useEffect(() => {
    if (!loading) {
      setTyped("");
      setMsgIndex(0);
      setPhase("typing");
      if (typingRef.current) cancelAnimationFrame(typingRef.current);
      return;
    }

    const current = messages[msgIndex % messages.length];

    const tick = () => {
      if (phase === "typing") {
        if (typed.length < current.length) {
          setTyped(current.slice(0, typed.length + 1));
          typingRef.current = requestAnimationFrame(tick);
        } else {
          setPhase("pausing");
          setTimeout(() => setPhase("deleting"), 1200);
        }
      } else if (phase === "deleting") {
        if (typed.length > 0) {
          setTyped(current.slice(0, typed.length - 1));
          typingRef.current = requestAnimationFrame(tick);
        } else {
          setMsgIndex((i) => (i + 1) % messages.length);
          setPhase("typing");
          typingRef.current = requestAnimationFrame(tick);
        }
      }
    };

    typingRef.current = requestAnimationFrame(tick);
    return () => {
      if (typingRef.current) cancelAnimationFrame(typingRef.current);
    };
  }, [loading, typed, phase, msgIndex, messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setPendingAccount({ email, password, name, phone });
    setShowOnboard(true);
  };

  const handleOnboardingComplete = async (restaurantValues: any) => {
    if (!pendingAccount) return;
    setLoading(true);
    setError("");
    const overlayStart = Date.now();
    const MIN_OVERLAY_MS = 2000;
    try {
      const cred = await createUserWithEmailAndPassword(auth, pendingAccount.email, pendingAccount.password);

      // Upload logo if selected
      let finalLogoUrl = restaurantValues.logoUrl || "";
      if (restaurantValues.logoFile) {
        const file: File = restaurantValues.logoFile as File;
        const ext = file.name.split(".").pop() || "png";
        const path = `business-logos/${cred.user.uid}/logo_${Date.now()}.${ext}`;
        const fileRef = ref(storage, path);
        const snap = await uploadBytes(fileRef, file, { contentType: file.type });
        finalLogoUrl = await getDownloadURL(snap.ref);
      }

      // Normalize and write to unified 'restaurants' collection
      const { logoFile, ...restValues } = restaurantValues || {};
      const normalized = normalizeRestaurantDoc(
        restValues,
        cred.user.uid,
        pendingAccount.name,
        pendingAccount.phone,
        finalLogoUrl
      );
      await addDoc(collection(db, "restaurants"), normalized);

      const elapsed = Date.now() - overlayStart;
      if (elapsed < MIN_OVERLAY_MS) {
        await new Promise((resolve) => setTimeout(resolve, MIN_OVERLAY_MS - elapsed));
      }

      router.push("/waitlist");
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
        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="mx-4 w-full max-w-md rounded-2xl border bg-white p-6 text-center shadow-xl">
              <div className="mb-3 flex items-center justify-center gap-3">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-300 border-t-[#FB7A20]" />
                <div className="animate-bounce text-2xl">🥊</div>
              </div>
              <div className="mb-1 text-sm font-medium text-gray-900">Setting up your business…</div>
              <div className="min-h-[1.5rem] text-sm text-gray-600">{typed || ""}</div>
              <div className="mt-4 text-xs text-gray-400">This usually takes just a moment.</div>
            </div>
          </div>
        )}
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
