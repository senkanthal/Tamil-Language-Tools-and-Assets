import test from "node:test";
import assert from "node:assert/strict";

import {
  applyMapping,
  availableRegExp,
  regExpHelper,
  regExpList,
} from "../dist/index.js";

const forwardFixtures = [
  {
    helperName: "BaminiToUnicode",
    mappingName: "Bamini",
    input: "fp fh f",
    expected: "கி கா க",
  },
  {
    helperName: "AnjalToUnicode",
    mappingName: "Anjal",
    input: "ó",
    expected: "ஜ",
  },
  {
    helperName: "TamToUnicode",
    mappingName: "Tam",
    input: "è",
    expected: "க",
  },
  {
    helperName: "TsciiToUnicode",
    mappingName: "Tscii",
    input: "§¸",
    expected: "கே",
  },
];

const reverseFixtures = [
  {
    helperName: "UnicodeToBamini",
    mappingName: "UniBamini",
    input: "க",
    expected: "f",
  },
  {
    helperName: "UnicodeToTab",
    mappingName: "UniTab",
    input: "க",
    expected: "è",
  },
  {
    helperName: "UnicodeToTscii",
    mappingName: "UniTscii",
    input: "க",
    expected: "¸",
  },
];

test("applyMapping matches the generated Bamini helper", () => {
  const input = "fp fh f";

  assert.equal(applyMapping(input, regExpList.Bamini), "கி கா க");
  assert.equal(regExpHelper.BaminiToUnicode(input), "கி கா க");
});

test("reverse mappings use the same mapping table as applyMapping", () => {
  const input = "தமிழ்";

  assert.equal(
    regExpHelper.UnicodeToBamini(input),
    applyMapping(input, regExpList.UniBamini),
  );
});

test("availableRegExp lists known forward and reverse mappings", () => {
  assert.ok(availableRegExp.includes("Bamini"));
  assert.ok(availableRegExp.includes("Anjal"));
  assert.ok(availableRegExp.includes("UniBamini"));
  assert.ok(availableRegExp.includes("UniTscii"));
});

test("generated helpers are exposed for forward and reverse conversions", () => {
  assert.equal(typeof regExpHelper.BaminiToUnicode, "function");
  assert.equal(typeof regExpHelper.AnjalToUnicode, "function");
  assert.equal(typeof regExpHelper.UnicodeToBamini, "function");
  assert.equal(typeof regExpHelper.UnicodeToTscii, "function");
});

test("a non-Bamini forward helper stays in sync with its mapping table", () => {
  const input = "ó";

  assert.equal(applyMapping(input, regExpList.Anjal), "ஜ");
  assert.equal(regExpHelper.AnjalToUnicode(input), "ஜ");
});

test("multiple reverse helpers stay in sync with their mapping tables", () => {
  const input = "க";

  assert.equal(
    regExpHelper.UnicodeToTscii(input),
    applyMapping(input, regExpList.UniTscii),
  );
  assert.equal(
    regExpHelper.UnicodeToTab(input),
    applyMapping(input, regExpList.UniTab),
  );
});

test("supported Bamini mappings round-trip representative text", () => {
  const unicodeText = "தமிழ்";
  const encoded = regExpHelper.UnicodeToBamini(unicodeText);

  assert.equal(regExpHelper.BaminiToUnicode(encoded), unicodeText);
});

test("forward mapping fixtures stay in sync across tables and helpers", () => {
  for (const fixture of forwardFixtures) {
    assert.equal(
      applyMapping(fixture.input, regExpList[fixture.mappingName]),
      fixture.expected,
    );
    assert.equal(
      regExpHelper[fixture.helperName](fixture.input),
      fixture.expected,
    );
  }
});

test("reverse mapping fixtures stay in sync across tables and helpers", () => {
  for (const fixture of reverseFixtures) {
    assert.equal(
      applyMapping(fixture.input, regExpList[fixture.mappingName]),
      fixture.expected,
    );
    assert.equal(
      regExpHelper[fixture.helperName](fixture.input),
      fixture.expected,
    );
  }
});
