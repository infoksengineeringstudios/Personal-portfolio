import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getMimeType } from "@/lib/utils";

export const runtime = "nodejs";

const ASSETS_ROOT = path.join(
  /* turbopackIgnore: true */ process.cwd(),
  "Assets",
);

function safeResolve(segments: string[]): string | null {
  const decoded = segments.map((segment) => decodeURIComponent(segment));
  const resolved = path.resolve(ASSETS_ROOT, ...decoded);
  const relative = path.relative(ASSETS_ROOT, resolved);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    return null;
  }
  return resolved;
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path: segments } = await context.params;
  if (!segments?.length) {
    return new NextResponse("Not found", { status: 404 });
  }

  const filePath = safeResolve(segments);
  if (!filePath || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    return new NextResponse("Not found", { status: 404 });
  }

  const buffer = fs.readFileSync(filePath);
  const filename = path.basename(filePath);

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": getMimeType(filename),
      "Content-Disposition": `inline; filename="${filename}"`,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
