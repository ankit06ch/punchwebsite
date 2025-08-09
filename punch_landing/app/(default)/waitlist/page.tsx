"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { auth, db } from "@/app/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Removed metadata export because this is a client component

type Move = "U" | "D" | "L" | "R";

const MOVE_INFO: Record<Move, { label: string; icon: string; keyHints: string[] }> = {
  U: { label: "Up", icon: "⬆️", keyHints: ["ArrowUp", "w", "W"] },
  D: { label: "Down", icon: "⬇️", keyHints: ["ArrowDown", "s", "S"] },
  L: { label: "Left", icon: "⬅️", keyHints: ["ArrowLeft", "a", "A"] },
  R: { label: "Right", icon: "➡️", keyHints: ["ArrowRight", "d", "D"] },
};

function randomMove(): Move {
  const keys: Move[] = ["U", "D", "L", "R"];
  return keys[Math.floor(Math.random() * keys.length)];
}

export default function Waitlist() {
  const [phase, setPhase] = useState<"idle" | "showing" | "input" | "over" | "won">("idle");
  const [round, setRound] = useState(1);
  const [sequence, setSequence] = useState<Move[]>([]);
  const [showIndex, setShowIndex] = useState(-1);
  const [inputIndex, setInputIndex] = useState(0);
  const [score, setScore] = useState(0);
  const showTimerRef = useRef<NodeJS.Timeout | null>(null);

  const rank = useMemo(() => {
    if (score >= 8) return "Champion";
    if (score >= 4) return "Heavyweight";
    return "Contender";
  }, [score]);

  const startGame = useCallback(() => {
    setScore(0);
    setRound(1);
    const initial: Move[] = [randomMove(), randomMove(), randomMove()];
    setSequence(initial);
    setInputIndex(0);
    setPhase("showing");
  }, []);

  const extendSequence = useCallback(() => {
    setSequence((prev) => [...prev, randomMove()]);
    setInputIndex(0);
    setPhase("showing");
  }, []);

  // Play the current sequence visually
  useEffect(() => {
    if (phase !== "showing") return;
    let i = 0;
    setShowIndex(-1);
    const step = () => {
      setShowIndex((prev) => prev + 1);
      i++;
      if (i < sequence.length) {
        showTimerRef.current = setTimeout(step, 650);
      } else {
        // small pause before input
        showTimerRef.current = setTimeout(() => {
          setShowIndex(-1);
          setInputIndex(0);
          setPhase("input");
        }, 500);
      }
    };
    showTimerRef.current = setTimeout(step, 250);
    return () => {
      if (showTimerRef.current) clearTimeout(showTimerRef.current);
    };
  }, [phase, sequence.length]);

  // Key input handler
  useEffect(() => {
    if (phase !== "input") return;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key;
      let move: Move | null = null;
      (Object.keys(MOVE_INFO) as Move[]).forEach((m) => {
        if (MOVE_INFO[m].keyHints.includes(key)) move = m;
      });
      if (!move) return;

      const expected = sequence[inputIndex];
      if (move === expected) {
        setInputIndex((i) => i + 1);
        setScore((s) => s + 1);
        if (inputIndex + 1 === sequence.length) {
          if (round >= 3) {
            setPhase("won");
          } else {
            // Next round: extend sequence by one
            setRound((r) => r + 1);
            extendSequence();
          }
        }
      } else {
        setPhase("over");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, inputIndex, round, sequence, extendSequence]);

  // Save high score on finish
  useEffect(() => {
    const save = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const ref = doc(db, "waitlist_scores", user.uid);
      const snap = await getDoc(ref);
      const prev = snap.exists() ? (snap.data().highScore as number) || 0 : 0;
      const highScore = Math.max(prev, score);
      await setDoc(
        ref,
        {
          highScore,
          lastScore: score,
          lastRank: rank,
          updatedAt: new Date(),
          foundersBadge: highScore >= 8,
        },
        { merge: true }
      );
    };
    if (phase === "over" || phase === "won") {
      save().catch(() => {});
    }
  }, [phase, score, rank]);

  const pressMove = (m: Move) => {
    if (phase !== "input") return;
    const expected = sequence[inputIndex];
    if (m === expected) {
      setInputIndex((i) => i + 1);
      setScore((s) => s + 1);
      if (inputIndex + 1 === sequence.length) {
        if (round >= 3) setPhase("won");
        else {
          setRound((r) => r + 1);
          extendSequence();
        }
      }
    } else {
      setPhase("over");
    }
  };

  return (
    <div className="mx-auto max-w-3xl py-16">
      <div className="relative overflow-hidden rounded-2xl border bg-white p-8 shadow-xl">
        <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#FB7A20]/20 blur-3xl" />
        <h1 className="mb-2 text-3xl font-extrabold tracking-tight">You're on the waitlist… but your first punch is coming.</h1>
        <p className="mb-6 text-gray-700">Play “Guess the Combo” while we prep your spot.</p>

        {/* Game area */}
        <div className="rounded-xl border bg-gray-50 p-4">
          <div className="mb-3 flex items-center justify-between text-sm text-gray-700">
            <div>Round: <span className="font-semibold">{round}/3</span></div>
            <div>Score: <span className="font-semibold">{score}</span></div>
            <div>Rank: <span className="font-semibold">{rank}</span></div>
          </div>

          {/* Sequence display */}
          <div className="mb-4 grid grid-cols-4 gap-3 sm:gap-4">
            {(Object.keys(MOVE_INFO) as Move[]).map((m) => (
              <div
                key={m}
                className={`flex h-16 items-center justify-center rounded-lg border bg-white text-2xl sm:h-20 ${
                  showIndex >= 0 && sequence[showIndex] === m ? "ring-2 ring-[#FB7A20] scale-105 transition" : ""
                }`}
              >
                {MOVE_INFO[m].icon}
              </div>
            ))}
          </div>

          {/* On-screen controls */}
          <div className="mb-3 grid grid-cols-3 place-items-center gap-2 sm:gap-3">
            <div />
            <button onClick={() => pressMove("U")} className="h-12 w-12 rounded-lg border bg-white text-xl hover:bg-gray-100">{MOVE_INFO.U.icon}</button>
            <div />
            <button onClick={() => pressMove("L")} className="h-12 w-12 rounded-lg border bg-white text-xl hover:bg-gray-100">{MOVE_INFO.L.icon}</button>
            <button onClick={() => pressMove("D")} className="h-12 w-12 rounded-lg border bg-white text-xl hover:bg-gray-100">{MOVE_INFO.D.icon}</button>
            <button onClick={() => pressMove("R")} className="h-12 w-12 rounded-lg border bg-white text-xl hover:bg-gray-100">{MOVE_INFO.R.icon}</button>
          </div>

          {/* Status & controls */}
          {phase === "idle" && (
            <div className="flex flex-col items-center gap-3 text-sm text-gray-700">
              <div>We’ll flash a combo (1–2s). Recreate it with WASD or arrow keys — or tap the buttons.</div>
              <button className="btn bg-[#FB7A20] text-white hover:bg-[#e66a1a]" onClick={startGame}>Start</button>
            </div>
          )}
          {phase === "input" && (
            <div className="text-center text-sm text-gray-700">Your turn! Type the combo using WASD/Arrow keys or tap the buttons.</div>
          )}
          {phase === "showing" && (
            <div className="text-center text-sm text-gray-700">Watch closely… combo incoming 🥊</div>
          )}
          {(phase === "over" || phase === "won") && (
            <div className="mt-3 flex flex-col items-center gap-2 text-center">
              <div className="text-lg font-semibold">{phase === "won" ? "Knockout!" : "Nice try!"}</div>
              <div className="text-sm text-gray-700">Punch Score: <span className="font-semibold">{score}</span> • Title: <span className="font-semibold">{rank}</span></div>
              <button className="btn bg-[#FB7A20] text-white hover:bg-[#e66a1a]" onClick={startGame}>Play again</button>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="/" className="btn bg-[#FB7A20] text-white shadow-sm hover:bg-[#e66a1a]">Back to Home</a>
          <a href="/signup" className="btn border border-gray-300 text-gray-700 hover:bg-gray-50">Create another</a>
        </div>
      </div>
    </div>
  );
}