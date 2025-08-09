"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export default function Waitlist() {
  // Typewriter jokes (from your list)
  const jokes = useMemo(
    () => [
      // Boxing/Punch-themed
      "You’re on the ropes… but in a good way. We’ll be in your corner soon!",
      "Hold tight — we’re winding up for a knockout launch.",
      "You’ve landed a spot on our waitlist. That’s a solid uppercut to boredom.",
      "We’re just wrapping up training camp before we let you in.",
      // Drink-themed
      "Good things take time to brew — you’re next in line for the good stuff.",
      "Your spot’s reserved — we’re just adding the final splash.",
      "The party starts soon, and you’re on the guest sip list.",
      // General cheeky
      "Patience is a virtue… but we promise this will pack a punch.",
      "We’re polishing our gloves — you’ll get the first swing at it soon.",
      "You’re in the ring now. All that’s left is the bell.",
    ],
    []
  );

  const [typed, setTyped] = useState("");
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const current = jokes[index % jokes.length];
    const tick = () => {
      if (phase === "typing") {
        if (typed.length < current.length) {
          setTyped(current.slice(0, typed.length + 1));
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setPhase("pausing");
          setTimeout(() => setPhase("deleting"), 1600);
        }
      } else if (phase === "deleting") {
        if (typed.length > 0) {
          setTyped(current.slice(0, typed.length - 1));
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setIndex((i) => (i + 1) % jokes.length);
          setPhase("typing");
          rafRef.current = requestAnimationFrame(tick);
        }
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [typed, phase, index, jokes]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="mx-auto max-w-2xl px-4 pt-28 pb-16 md:pt-36">
        {/* Header */}
        <div className="mb-6 flex items-start gap-3">
          <div className="text-4xl">🥊</div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">You're on the waitlist… but your first punch is coming.</h1>
            <p className="text-sm text-gray-600">Thanks for joining Punch — we’ll notify you when your dashboard is ready.</p>
          </div>
        </div>

        {/* Joke typer card */}
        <div className="relative overflow-hidden rounded-2xl border bg-white p-8 shadow-xl">
          {/* Glow */}
          <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#FB7A20]/20 blur-3xl" />

          <div className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">Today’s ringside commentary</div>
          <div className="min-h-[3rem] text-lg font-medium text-gray-900">
            {typed}
            <span className="ml-1 inline-block h-5 w-[2px] animate-pulse bg-gray-900 align-middle" />
          </div>
          <div className="mt-3 text-xs text-gray-500">We rotate these while we finish setting things up.</div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="/" className="btn bg-[#FB7A20] text-white shadow-sm hover:bg-[#e66a1a]">Back to Home</a>
          <a href="/signup" className="btn border border-gray-300 text-gray-700 hover:bg-gray-50">Create another</a>
        </div>
      </div>
    </div>
  );
}