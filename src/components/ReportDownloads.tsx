import type { MediaFile } from "@/lib/types";

interface ReportDownloadsProps {
  reports: MediaFile[];
}

export function ReportDownloads({ reports }: ReportDownloadsProps) {
  if (!reports.length) {
    return (
      <section
        aria-labelledby="reports-heading"
        className="rounded-[22px] border border-dashed border-[var(--border-strong)] bg-white/40 p-6"
      >
        <h2
          id="reports-heading"
          className="text-xl font-semibold tracking-[-0.03em]"
        >
          Documents
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          No documents yet. Add PDF, DOCX, or PPT files to this folder to view
          them here.
        </p>
      </section>
    );
  }

  return (
    <section aria-labelledby="reports-heading">
      <h2
        id="reports-heading"
        className="text-xl font-semibold tracking-[-0.03em] text-foreground"
      >
        Documents
      </h2>
      <ul className="mt-4 space-y-3">
        {reports.map((report) => (
          <li key={report.url}>
            <a
              href={report.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--border)] bg-white/70 px-4 py-3.5 transition-colors hover:border-[var(--border-strong)] hover:bg-white"
            >
              <div>
                <p className="font-medium tracking-[-0.02em] text-foreground">
                  {report.name}
                </p>
                <p className="mt-0.5 text-xs uppercase tracking-[0.08em] text-subtle">
                  {report.filename.split(".").pop()}
                </p>
              </div>
              <span className="shrink-0 text-sm font-medium text-accent">
                View
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}