import type { Certification } from "@/lib/types";

interface CertificationsProps {
  items: Certification[];
}

function Tile({ cert }: { cert: Certification }) {
  const inner = (
    <div className="corner-marks flex h-full flex-col items-center gap-4 rounded-[var(--radius)] border border-[var(--border)] bg-white/80 p-6 text-center transition-colors hover:border-[var(--border-strong)] hover:bg-white">
      {cert.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={cert.image}
          alt={`${cert.label} badge`}
          className="h-24 w-24 object-contain"
          loading="lazy"
        />
      ) : (
        <div
          className="flex h-24 w-24 items-center justify-center rounded-full border border-[var(--border-strong)] font-mono text-2xl font-semibold tracking-[0.05em] text-foreground"
          style={{
            background:
              "linear-gradient(150deg, #f1f1ef 0%, #e3e4e2 55%, #d1d3d2 100%)",
          }}
          aria-hidden="true"
        >
          {cert.monogram}
        </div>
      )}
      <div>
        <p className="font-semibold tracking-[-0.02em] text-foreground">
          {cert.label}
        </p>
        <p className="mt-1 text-sm leading-snug text-muted">{cert.issuer}</p>
      </div>
    </div>
  );

  if (cert.href) {
    return (
      <a
        href={cert.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        {inner}
      </a>
    );
  }
  return inner;
}

export function Certifications({ items }: CertificationsProps) {
  if (!items.length) return null;

  return (
    <section aria-labelledby="certs-heading" className="mt-16 sm:mt-20">
      <h2
        id="certs-heading"
        className="text-xl font-semibold tracking-[-0.03em] text-foreground"
      >
        Certifications
      </h2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((cert) => (
          <li key={cert.label} className="h-full">
            <Tile cert={cert} />
          </li>
        ))}
      </ul>
    </section>
  );
}
