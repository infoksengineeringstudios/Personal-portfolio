import Link from "next/link";

interface FooterProps {
  name: string;
  email: string;
}

export function Footer({ name, email }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-auto border-t-2 border-[var(--border-strong)] bg-white/70">
      <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8">
        {/* Title-block grid, like the corner of a drawing sheet */}
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-[var(--border)] sm:grid-cols-4">
          {[
            ["Project", "Engineering Portfolio"],
            ["Drawn by", name],
            ["Contact", email],
            ["Issued", String(year)],
          ].map(([label, value]) => (
            <div key={label} className="bg-white px-4 py-3">
              <p className="label-mono label-mono--muted">{label}</p>
              {label === "Contact" ? (
                <a
                  href={`mailto:${email}`}
                  className="mt-1 block break-all text-sm font-medium text-accent hover:underline"
                >
                  {value}
                </a>
              ) : (
                <p className="mt-1 text-sm font-medium text-foreground">
                  {value}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Scale bar */}
            <svg
              width="110"
              height="18"
              viewBox="0 0 110 18"
              aria-hidden="true"
              className="text-foreground"
            >
              <rect x="0" y="6" width="25" height="5" fill="currentColor" />
              <rect
                x="25"
                y="6"
                width="25"
                height="5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
              <rect x="50" y="6" width="25" height="5" fill="currentColor" />
              <rect
                x="75"
                y="6"
                width="25"
                height="5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
              <text
                x="0"
                y="4"
                fontFamily="var(--font-jetbrains), monospace"
                fontSize="6"
                fill="currentColor"
              >
                0
              </text>
              <text
                x="96"
                y="4"
                fontFamily="var(--font-jetbrains), monospace"
                fontSize="6"
                fill="currentColor"
              >
                100m
              </text>
            </svg>
            {/* North arrow */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              aria-hidden="true"
              className="text-foreground"
            >
              <circle
                cx="10"
                cy="10"
                r="9"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
              <path d="M10 3 L13 13 L10 10.5 L7 13 Z" fill="currentColor" />
              <text
                x="10"
                y="18"
                textAnchor="middle"
                fontFamily="var(--font-jetbrains), monospace"
                fontSize="5"
                fill="currentColor"
              >
                N
              </text>
            </svg>
            <p className="font-mono text-xs text-subtle">
              &copy; {year} {name} &middot; Built to tolerance
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 font-mono text-xs uppercase tracking-[0.08em] text-muted">
            <Link href="/projects" className="hover:text-accent">
              Projects
            </Link>
            <Link href="/internships" className="hover:text-accent">
              Internships
            </Link>
            <Link href="/leadership" className="hover:text-accent">
              Leadership
            </Link>
            <Link href="/about" className="hover:text-accent">
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
