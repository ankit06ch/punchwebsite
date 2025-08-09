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

  // Typing config
  const TYPING_INTERVAL_MS = 70; // slow down typing slightly
  const DELETING_INTERVAL_MS = 55; // slightly slower delete for readability
  const PAUSE_BEFORE_DELETE_MS = 2000; // add a longer pause before deleting

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = jokes[index % jokes.length];

    // Clear any pending timeouts before scheduling a new one
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
        setIndex((i) => (i + 1) % jokes.length);
        setPhase("typing");
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [typed, phase, index, jokes]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="flex min-h-[80vh] flex-col justify-center">
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
          {/* Removed per request */}
        </div>

        {/* CTAs intentionally removed per request */}
        </div>
      </div>
    </div>
  );
}