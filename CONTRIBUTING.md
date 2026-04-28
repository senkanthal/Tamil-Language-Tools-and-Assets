# Contributing to Tamil-Language-Tools-and-Assets

Thanks for contributing.

This project maintains Tamil legacy-font and Unicode regex mappings, helper functions, tests, and release automation. Good contributions are usually one of these:

- fixing incorrect mappings
- adding new mappings or reverse mappings
- improving test coverage
- improving packaging, docs, or release workflow

## Before You Start

- Read the [README](./README.md) for the package API and workflow.
- Check existing [issues](https://github.com/senkanthal/Tamil-Language-Tools-and-Assets/issues) before opening a new one.
- Keep changes focused. Mapping changes and workflow changes are easier to review when they are not mixed unnecessarily.

## Development Setup

Install dependencies:

```bash
bun install
```

Useful scripts:

```bash
npm run build
npm test
npm run test:node
npm run test:bun
npm run typecheck
npm run typecheck:test
npm run format
```

What these do:

- `npm run build`: builds the package into `dist`
- `npm test`: runs the Node-based built-output tests
- `npm run test:node`: same as `npm test`
- `npm run test:bun`: runs the Bun-native TypeScript tests against `src`
- `npm run typecheck`: typechecks the main package
- `npm run typecheck:test`: typechecks the Bun test project
- `npm run format`: formats the repo with Prettier

## Contribution Workflow

1. Create a branch from `main`.
2. Make your change.
3. Run the relevant checks locally.
4. Add or update tests if behavior changed.
5. Add a changeset if the package should be released.
6. Open a pull request.

Recommended local verification before opening a PR:

```bash
npm run typecheck
npm run typecheck:test
npm run test:bun
npm test
```

## Mapping Changes

When editing mapping data:

- prefer small, targeted edits
- verify ordering carefully because many mappings are order-sensitive
- add or update tests for the affected mapping
- use simple, unambiguous fixture examples when possible

If a mapping only works because of ordering, mention that in the PR description.

## Tests

This repo has two test paths:

- Bun-native tests in [test/index.test.ts](./test/index.test.ts)
- Node-based built-output tests in [test/index.node.test.mjs](./test/index.node.test.mjs)

Please update both when necessary if your change affects public behavior.

## Reporting Bugs

When reporting a bug, please include:

- the mapping name, for example `Bamini`, `Anjal`, or `UniBamini`
- the exact input
- the actual output
- the expected output
- a minimal reproduction example

If possible, also mention whether the issue affects:

- `applyMapping`
- `regExpHelper`
- both

## Documentation

Documentation improvements are welcome. If you change the API, exports, scripts, or release workflow, update:

- [README.md](./README.md)
- this file if the contributor workflow changed

## Versioning and Releases

This repo uses Changesets for controlled version PRs.

To add a changeset:

```bash
npm run changeset
```

Choose the appropriate bump type:

- `patch`: fixes, tests, docs, packaging improvements, non-breaking mapping fixes
- `minor`: new backward-compatible features
- `major`: breaking API or behavior changes

After a changeset lands on `main`, GitHub Actions opens or updates a `Version Packages` PR. Merging that PR updates version files in git. Publishing is handled separately by the npm publish workflow.

## Pull Request Tips

- Use a clear PR title.
- Explain what changed and why.
- Call out any ordering-sensitive mapping changes.
- Mention test coverage you added or updated.

## License

By contributing, you agree that your contributions will be licensed under the project license listed in [LICENSE](./LICENSE).
