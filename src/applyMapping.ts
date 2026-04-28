export type RegExpMapping = [RegExp | string, string][];

const applyMapping = (text: string, mapping: RegExpMapping): string =>
  mapping.reduce(
    (value, [pattern, replacement]) => value.replace(pattern, replacement),
    text,
  );

export default applyMapping;
