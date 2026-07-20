import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-6xl flex-col items-start justify-center px-5 py-20 sm:px-8">
      <p className="label-mono">ERR 404 — Sheet not found</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em]">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-muted">
        That route doesn&apos;t exist. Check the URL or return home.
      </p>
      <Link
        href="/"
        className="btn-primary mt-8 h-11 px-5 text-sm"
      >
        Back home
      </Link>
    </div>
  );
}
