// Fortune in a Pot — make.fun bounty
// u-golden-heron-44-fortune-in-a-pot-ded981e9
//
// Writes one fortune for a houseplant on the windowsill to
// /output/entry.txt. The gate: 1-120 characters, one non-blank line.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "Your roots will outgrow this pot by spring, and your keeper, who chats with you daily, will take all the credit.";

// Gate enforced before writing: the competition accepts only UTF-8 text
// of 1-120 characters, a single non-blank line.
function validateEntry(text: string): void {
  if (text.trim().length === 0) throw new Error("entry is blank");
  if (text.length < 1 || text.length > 120) {
    throw new Error(`entry is ${text.length} chars, must be 1-120`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

const OUT = process.env.OUTPUT_PATH ?? "/output/entry.txt";

validateEntry(ENTRY);
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, ENTRY, "utf8");
console.log(`Wrote ${ENTRY.length} chars to ${OUT}`);
