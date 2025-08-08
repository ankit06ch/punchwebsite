"use client";
import React from "react";

export default function Cta() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className="relative overflow-hidden rounded-2xl text-center shadow-xl before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-gray-900"
          data-aos="zoom-y-out"
        >
          {/* Animated Glow */}
          <div
            className="absolute bottom-0 left-1/2 -z-10 -translate-x-1/2 translate-y-1/2 animate-glow-move"
            aria-hidden="true"
          >
            <div className="h-56 w-[480px] rounded-full border-[20px] border-[#FB7A20] blur-3xl" />
          </div>

          <div className="px-4 py-12 md:px-12 md:py-20">
            <h2 className="mb-6 text-3xl font-bold text-gray-200 md:mb-12 md:text-4xl">
              Ready to start earning rewards?
            </h2>
            <p className="mb-8 text-lg text-gray-400">
              Join thousands of customers and businesses already using Punch to build stronger connections.
            </p>
            <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center sm:space-x-4">
              <a
                className="btn group mb-4 w-full bg-[#FB7A20] text-white shadow-sm hover:bg-[#e66a1a] sm:mb-0 sm:w-auto"
                href="#0"
              >
                <span className="relative inline-flex items-center">
                  Download App{" "}
                  <span className="ml-1 tracking-normal text-orange-200 transition-transform group-hover:translate-x-0.5">
                    -&gt;
                  </span>
                </span>
              </a>
              <a
                className="btn w-full bg-white text-gray-800 shadow-sm hover:bg-gray-50 sm:w-auto"
                href="#0"
              >
                For Businesses
              </a>
            </div>
          </div>
          <style jsx global>{`
            @keyframes glow-move {
              0% {
                transform: translate(-50%, 50%) scale(1);
                filter: blur(48px);
              }
              25% {
                transform: translate(-30%, 30%) scale(1.05);
                filter: blur(60px);
              }
              50% {
                transform: translate(-50%, -10%) scale(1.1);
                filter: blur(48px);
              }
              75% {
                transform: translate(-70%, 30%) scale(1.05);
                filter: blur(60px);
              }
              100% {
                transform: translate(-50%, 50%) scale(1);
                filter: blur(48px);
              }
            }
            .animate-glow-move {
              animation: glow-move 8s ease-in-out infinite;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
