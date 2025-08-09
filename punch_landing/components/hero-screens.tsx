"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const ASSET_VERSION = "2"; // bump this to bust browser cache
const SCREENSHOTS = [
  `/images/screenshots/IMG_9E6B7936BFC5-1.jpeg?v=${ASSET_VERSION}`,
  `/images/screenshots/IMG_50F5E253B3BD-1.jpeg?v=${ASSET_VERSION}`,
  `/images/screenshots/IMG_AF9A8D624551-1.jpeg?v=${ASSET_VERSION}`,
  `/images/screenshots/IMG_BD9591AE68C8-1.jpeg?v=${ASSET_VERSION}`,
];

const DISPLAY_MS = 3200; // time an image stays fully visible
const ANIMATION_MS = 900; // per animation duration

type Phase = "idle" | "out" | "in";

export default function HeroScreens() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");

  const displayRef = useRef<NodeJS.Timeout | null>(null);
  const outRef = useRef<NodeJS.Timeout | null>(null);
  const inRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Schedule first transition from idle -> out after display time
    if (phase === "idle") {
      if (displayRef.current) clearTimeout(displayRef.current);
      displayRef.current = setTimeout(() => {
        const computedNext = (currentIndex + 1) % SCREENSHOTS.length;
        setNextIndex(computedNext);
        setPhase("out");
      }, DISPLAY_MS);
    }

    return () => {
      if (displayRef.current) clearTimeout(displayRef.current);
    };
  }, [phase, currentIndex]);

  useEffect(() => {
    if (phase === "out") {
      // After down-out completes, start up-in
      if (outRef.current) clearTimeout(outRef.current);
      outRef.current = setTimeout(() => {
        setPhase("in");
      }, ANIMATION_MS);
    }
    return () => {
      if (outRef.current) clearTimeout(outRef.current);
    };
  }, [phase]);

  useEffect(() => {
    if (phase === "in") {
      if (inRef.current) clearTimeout(inRef.current);
      inRef.current = setTimeout(() => {
        // Commit next as current and return to idle
        if (nextIndex !== null) setCurrentIndex(nextIndex);
        setNextIndex(null);
        setPhase("idle");
      }, ANIMATION_MS);
    }
    return () => {
      if (inRef.current) clearTimeout(inRef.current);
    };
  }, [phase, nextIndex]);

  return (
    <div className="absolute top-[10%] left-[30%] w-[40%] z-10">
      {/* Current image (idle or animating down-out) */}
      <div className="absolute inset-0">
        <Image
          src={SCREENSHOTS[currentIndex]}
          width={1200}
          height={800}
          alt="App screenshot current"
          className={`w-full h-auto rounded-xl shadow-2xl ${phase === "out" ? "animate-screenshot-down-out" : ""}`}
          priority
        />
      </div>

      {/* Next image (animating up-in) */}
      {phase === "in" && nextIndex !== null && (
        <div className="absolute inset-0">
          <Image
            src={SCREENSHOTS[nextIndex]}
            width={1200}
            height={800}
            alt="App screenshot next"
            className="w-full h-auto rounded-xl shadow-2xl animate-screenshot-up-in"
            priority
          />
        </div>
      )}
    </div>
  );
}

