#!/usr/bin/env node
/**
 * Flags content files that are not plain UTF-8 (usually UTF-16 saved by a
 * Windows editor), which can break markdown frontmatter parsing.
 *
 *   node scripts/check-encoding.mjs        # report offenders, exit 1 if any
 *   node scripts/check-encoding.mjs --fix  # rewrite offenders as UTF-8
 */
import fs from "node:fs";
import path from "node:path";

const ROOTS = ["Assets", "Contents"];
const EXTS = new Set([".md", ".mdx", ".txt"]);
const fix = process.argv.includes("--fix");

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    // Skip editor lock/temp files (Word "~$", LibreOffice ".~", *.tmp).
    if (/^(~\$|\.~)/.test(entry.name) || /\.tmp$/i.test(entry.name)) return [];
    return EXTS.has(path.extname(entry.name).toLowerCase()) ? [full] : [];
  });
}

function classify(buffer) {
  if (buffer.length >= 2 && buffer[0] === 0xff && buffer[1] === 0xfe)
    return { kind: "utf-16le", text: () => buffer.subarray(2).toString("utf16le") };
  if (buffer.length >= 2 && buffer[0] === 0xfe && buffer[1] === 0xff)
    return { kind: "utf-16be", text: () => buffer.subarray(2).swap16().toString("utf16le") };
  if (buffer.length >= 3 && buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf)
    return { kind: "utf-8-bom", text: () => buffer.subarray(3).toString("utf8") };
  const sample = buffer.subarray(0, 64);
  let nulls = 0;
  for (const b of sample) if (b === 0x00) nulls += 1;
  if (sample.length > 8 && nulls / sample.length > 0.25)
    return { kind: "utf-16le (no BOM)", text: () => buffer.toString("utf16le") };
  return null; // clean UTF-8
}

const files = ROOTS.flatMap(walk);
const offenders = [];
for (const file of files) {
  const info = classify(fs.readFileSync(file));
  if (!info) continue;
  offenders.push({ file, kind: info.kind });
  if (fix) {
    const utf8 = info.text().replace(/^﻿/, "").replace(/\r\n/g, "\n");
    fs.writeFileSync(file, utf8, "utf8");
  }
}

if (offenders.length === 0) {
  console.log(`✓ encoding: all ${files.length} content files are UTF-8`);
  process.exit(0);
}

for (const { file, kind } of offenders) {
  console.log(`${fix ? "fixed " : "⚠ "}${kind.padEnd(18)} ${file}`);
}
if (fix) {
  console.log(`\nConverted ${offenders.length} file(s) to UTF-8.`);
  process.exit(0);
}
console.log(
  `\n${offenders.length} file(s) are not UTF-8. Run \`npm run check:encoding:fix\` to convert.`,
);
process.exit(1);
