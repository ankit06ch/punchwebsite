"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./logo";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-2 z-30 w-full md:top-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-white/90 px-3 shadow-lg shadow-black/[0.03] backdrop-blur-xs before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(var(--color-gray-100),var(--color-gray-200))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
          {/* Site branding */}
          <div className="flex flex-1 items-center">
            <Logo />
          </div>

          {/* Desktop navigation */}
          <ul className="hidden flex-1 items-center justify-end gap-3 md:flex">
            {/* Removed How it Works */}
            <li>
              <Link
                href="/login"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                For Businesses
              </Link>
            </li>
            <li>
              <Link
                href="/waitlist"
                className="btn-sm bg-[#FB7A20] text-white shadow-sm hover:bg-[#e66a1a]"
              >
                Download App
              </Link>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <div className="flex flex-1 items-center justify-end md:hidden">
            <button
              aria-label="Open menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 shadow-sm"
              onClick={() => setOpen((v) => !v)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            {open && (
              <div className="absolute right-3 top-14 z-40 w-48 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
                <nav className="flex flex-col p-2">
                  <Link
                    href="/login"
                    className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                    onClick={() => setOpen(false)}
                  >
                    For Businesses
                  </Link>
                  <Link
                    href="/waitlist"
                    className="mt-1 px-3 py-2 text-sm rounded-lg bg-[#FB7A20] text-white text-center hover:bg-[#e66a1a]"
                    onClick={() => setOpen(false)}
                  >
                    Download App
                  </Link>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
