import Link from 'next/link';

export function LandingFooter() {
  return (
    <footer className="py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="border-t border-[var(--nt-ink)] pt-6">
          <div className="font-mono text-[11px] text-[var(--nt-text-muted)] tracking-wider text-center">
            ● NOTETAKE · EST. MMXXVI · MADE ON EARTH · v1.0.0
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-6 font-mono text-[11px] text-[var(--nt-text-muted)]">
          <Link href="/login" className="hover:text-[var(--nt-text-primary)] transition-colors cursor-pointer">Sign in</Link>
          <Link href="/register" className="hover:text-[var(--nt-text-primary)] transition-colors cursor-pointer">Register</Link>
          <Link href="/privacy" className="hover:text-[var(--nt-text-primary)] transition-colors cursor-pointer">Privacy</Link>
          <Link href="/terms" className="hover:text-[var(--nt-text-primary)] transition-colors cursor-pointer">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
