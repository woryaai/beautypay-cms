# Validation status

The migration was checked in the conversion environment with the following dependency-independent gates:

- All TypeScript/TSX source files parse successfully.
- Strict TypeScript structure check passes using local framework type stubs (used only because registry access was unavailable in the conversion environment).
- All retained JavaScript compatibility files pass `node --check`.
- All 42 route modules are present.
- All local asset references resolve under `public/`.
- All clean internal route references resolve to a known route.
- No local legacy `.html` links remain in migrated page TSX.
- No `dangerouslySetInnerHTML` remains in page content.

The environment could not reach the npm registry reliably, so installing the pinned dependencies and running the real `next build` was not possible there. On a networked machine/CI, run `npm install && npm run check`; the included CI workflow performs the same release gate.
