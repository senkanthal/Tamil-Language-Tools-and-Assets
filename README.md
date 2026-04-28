# Tamil Language Tools and Assets

Regular expression mappings and helper functions for converting between legacy Tamil ASCII encodings and Unicode Tamil.

This package is published as ESM and currently exposes four main runtime exports:

- `applyMapping`: a generic utility for applying any mapping table
- `regExpList`: all regex mapping tables
- `availableRegExp`: the list of available mapping names
- `regExpHelper`: helper functions grouped by font/direction

## Install

```bash
npm install tamil-language-tools-and-assets
```

## Exports

### `applyMapping`

`applyMapping` applies a mapping table to a string in sequence.

```ts
import { applyMapping, regExpList } from "tamil-language-tools-and-assets";

const converted = applyMapping("fp fh f", regExpList.Bamini);
console.log(converted);
```

### `regExpList`

`regExpList` is an object whose keys are mapping names such as `Bamini`, `Anjal`, `UniBamini`, and `UniTscii`.

```ts
import { regExpList } from "tamil-language-tools-and-assets";

const bamini = regExpList.Bamini;
const unicodeToBamini = regExpList.UniBamini;
```

Forward mappings use names like `Bamini` or `Anjal`. Reverse mappings use `Uni*` names when available.

### `availableRegExp`

`availableRegExp` contains all supported mapping names.

```ts
import { availableRegExp } from "tamil-language-tools-and-assets";

console.log(availableRegExp);
```

### `regExpHelper`

`regExpHelper` exposes ready-to-use conversion helpers such as `BaminiToUnicode` and `UnicodeToBamini`.
These helpers are generated from `regExpList`, so the mapping tables and helper behavior stay in sync.

```ts
import { regExpHelper } from "tamil-language-tools-and-assets";

const converted = regExpHelper.BaminiToUnicode("fp fh f");
console.log(converted);
```

## Usage

### Use a mapping table directly

```ts
import { applyMapping, regExpList } from "tamil-language-tools-and-assets";

console.log(applyMapping("fp fh f", regExpList.Bamini));
```

### Use a helper function

```ts
import { regExpHelper } from "tamil-language-tools-and-assets";

console.log(regExpHelper.BaminiToUnicode("fp fh f"));
console.log(regExpHelper.UnicodeToBamini("தமிழ்"));
```

## Available Mappings

The package includes forward mappings for:

- `Anjal`
- `Anjal1`
- `Bamini`
- `Boomi`
- `Dinakaran`
- `Dinamani`
- `Indoweb`
- `Keyman`
- `Koeln`
- `Libi`
- `Murasoli`
- `Mylai`
- `Nakkeeeran`
- `Oldvikatan`
- `Roman`
- `Senthamizh`
- `Tab`
- `Tam`
- `Thanthy`
- `Tscii`
- `Webulagam`

Reverse mappings are currently available for:

- `UniBamini`
- `UniKeyman`
- `UniTab`
- `UniTscii`

## Types

The main exported types are:

```ts
export type RegExpMapping = [RegExp | string, string][];

export type RegExpListType = {
  [key: string]: [RegExp | string, string][];
};

export type RegExpHelperType = {
  [helperName: string]: (text: string) => string;
};
```

## Development

This repo uses a single TypeScript config and builds ESM output into `dist`.

The published build includes JavaScript and declaration files, without source maps or declaration maps.

```bash
npm run build
```

Run the API-level test suite with:

```bash
bun test
```

Run the Bun-native TypeScript tests explicitly with:

```bash
npm run test:bun
```

Run the Node-based built-output tests with:

```bash
npm test
```

Or directly:

```bash
npm run test:node
```

Tests also run automatically in GitHub Actions on pushes to `main` and on pull requests.

## Releases

This repo uses Changesets for controlled version PRs.

To add a release note entry for a change:

```bash
npm run changeset
```

When changesets land on `main`, GitHub Actions opens or updates a `Version Packages` PR with the version bump. Merging that PR updates version files in git, and publishing can still happen separately through the npm publish workflow.

## License

Licensed under the GNU Affero General Public License v3.0. See [LICENSE](./LICENSE).
