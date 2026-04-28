/// <reference types="bun" />

import { expect, test } from "bun:test";

import {
  applyMapping,
  availableRegExp,
  regExpHelper,
  regExpList,
} from "../src/index.ts";

type HelperName = keyof typeof regExpHelper;
type MappingName = keyof typeof regExpList;

type Fixture = {
  helperName: HelperName;
  mappingName: MappingName;
  input: string;
  expected: string;
};

const forwardFixtures: Fixture[] = [
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

const reverseFixtures: Fixture[] = [
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

  expect(applyMapping(input, regExpList.Bamini)).toBe("கி கா க");
  expect(regExpHelper.BaminiToUnicode(input)).toBe("கி கா க");
});

test("reverse mappings use the same mapping table as applyMapping", () => {
  const input = "தமிழ்";

  expect(regExpHelper.UnicodeToBamini(input)).toBe(
    applyMapping(input, regExpList.UniBamini),
  );
});

test("availableRegExp lists known forward and reverse mappings", () => {
  expect(availableRegExp.includes("Bamini")).toBe(true);
  expect(availableRegExp.includes("Anjal")).toBe(true);
  expect(availableRegExp.includes("UniBamini")).toBe(true);
  expect(availableRegExp.includes("UniTscii")).toBe(true);
});

test("generated helpers are exposed for forward and reverse conversions", () => {
  expect(typeof regExpHelper.BaminiToUnicode).toBe("function");
  expect(typeof regExpHelper.AnjalToUnicode).toBe("function");
  expect(typeof regExpHelper.UnicodeToBamini).toBe("function");
  expect(typeof regExpHelper.UnicodeToTscii).toBe("function");
});

test("a non-Bamini forward helper stays in sync with its mapping table", () => {
  const input = "ó";

  expect(applyMapping(input, regExpList.Anjal)).toBe("ஜ");
  expect(regExpHelper.AnjalToUnicode(input)).toBe("ஜ");
});

test("multiple reverse helpers stay in sync with their mapping tables", () => {
  const input = "க";

  expect(regExpHelper.UnicodeToTscii(input)).toBe(
    applyMapping(input, regExpList.UniTscii),
  );
  expect(regExpHelper.UnicodeToTab(input)).toBe(
    applyMapping(input, regExpList.UniTab),
  );
});

test("supported Bamini mappings round-trip representative text", () => {
  const unicodeText = "தமிழ்";
  const encoded = regExpHelper.UnicodeToBamini(unicodeText);

  expect(regExpHelper.BaminiToUnicode(encoded)).toBe(unicodeText);
});

test("forward mapping fixtures stay in sync across tables and helpers", () => {
  for (const fixture of forwardFixtures) {
    expect(applyMapping(fixture.input, regExpList[fixture.mappingName])).toBe(
      fixture.expected,
    );
    expect(regExpHelper[fixture.helperName](fixture.input)).toBe(
      fixture.expected,
    );
  }
});

test("reverse mapping fixtures stay in sync across tables and helpers", () => {
  for (const fixture of reverseFixtures) {
    expect(applyMapping(fixture.input, regExpList[fixture.mappingName])).toBe(
      fixture.expected,
    );
    expect(regExpHelper[fixture.helperName](fixture.input)).toBe(
      fixture.expected,
    );
  }
});
