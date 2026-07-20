import Link from "next/link";

interface FooterProps {
  name: string;
  email: string;
}

export function Footer({ name, email }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-auto border-t border-[var(--border)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="text-sm font-medium tracking-[-0.02em] text-foreground">
            {name}
          </p>
          <p className="mt-1 text-sm text-muted">
            Engineering portfolio · {year}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
          <Link href="/projects" className="hover:text-foreground">
            Projects
          </Link>
          <Link href="/about" className="hover:text-foreground">
            About
          </Link>
          <a href={`mailto:${email}`} className="hover:text-foreground">
            {email}
          </a>
        </div>
      </div>
    </footer>
  );
}
