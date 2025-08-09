"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

export default function NotFound() {
  const puns = useMemo(
    () => [
      "Looks like this page didn’t land the hit. Let’s get you back in the ring.",
      "You swung… and missed. But hey, even champs whiff sometimes.",
      "This page threw in the towel. Let’s find you a better one.",
    ],
    []
  );

  const [typed, setTyped] = useState("");
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

  const TYPING_INTERVAL_MS = 70;
  const DELETING_INTERVAL_MS = 55;
  const PAUSE_BEFORE_DELETE_MS = 2000;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = puns[index % puns.length];
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (phase === "typing") {
      if (typed.length < current.length) {
        timeoutRef.current = setTimeout(() => {
          setTyped(current.slice(0, typed.length + 1));
        }, TYPING_INTERVAL_MS);
      } else {
        setPhase("pausing");
        timeoutRef.current = setTimeout(() => setPhase("deleting"), PAUSE_BEFORE_DELETE_MS);
      }
    } else if (phase === "deleting") {
      if (typed.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setTyped(current.slice(0, typed.length - 1));
        }, DELETING_INTERVAL_MS);
      } else {
        setIndex((i) => (i + 1) % puns.length);
        setPhase("typing");
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [typed, phase, index, puns]);

  return (
    <>
      <Header />
      <main className="grow bg-gradient-to-b from-orange-50 to-white">
        <div className="mx-auto max-w-2xl px-4 py-24">
          <div className="flex min-h-[60vh] flex-col justify-center">
          {/* Header */}
          <div className="mb-6 flex items-start gap-3">
            <div className="text-4xl">🥊</div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">Page not found</h1>
              <p className="text-sm text-gray-600">We couldn’t find that page. Try heading back home.</p>
            </div>
          </div>

          {/* Pun typer card */}
          <div className="relative overflow-hidden rounded-2xl border bg-white p-8 shadow-xl">
            {/* Glow */}
            <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#FB7A20]/20 blur-3xl" />

            <div className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">Ringside commentary</div>
            <div className="min-h-[3rem] text-lg font-medium text-gray-900">
              {typed}
              <span className="ml-1 inline-block h-5 w-[2px] animate-pulse bg-gray-900 align-middle" />
            </div>
          </div>

          </div>
        </div>
      </main>
      <Footer border={true} />
    </>
  );
}

