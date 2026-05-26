"use client";

import Link from "next/link";

const cities = [
  "Lagos",
  "New York",
  "London",
  "Singapore",
  "Taipei",
  "Paris",
  "San Francisco",
];

export function LandingFooter() {
  const cityContent = cities.map((c) => `· ${c}  `).join("");

  return (
    <footer className="py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="pt-6 overflow-hidden">
          <div className="animate-marquee flex whitespace-nowrap font-mono text-[11px] text-[var(--nt-text-muted)] tracking-wider">
            <span className="mr-8">{cityContent}</span>
            <span className="mr-8">{cityContent}</span>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="font-mono text-[11px] text-[var(--nt-text-muted)] tracking-wider">
            ● NOTETAKE · EST. MMXXVI · v1.0.0
          </div>
          <div className="flex flex-wrap justify-center gap-6 font-mono text-[11px] text-[var(--nt-text-muted)]">
            <Link
              href="/login"
              className="hover:text-[var(--nt-text-primary)] transition-colors cursor-pointer"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="hover:text-[var(--nt-text-primary)] transition-colors cursor-pointer"
            >
              Register
            </Link>
            <Link
              href="/privacy"
              className="hover:text-[var(--nt-text-primary)] transition-colors cursor-pointer"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-[var(--nt-text-primary)] transition-colors cursor-pointer"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
