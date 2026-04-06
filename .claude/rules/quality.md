# Quality Standards

## After Every Code Change

Run `npm run build` after modifying any `.ts` or `.tsx` file. This catches TypeScript errors and compilation issues. The build must pass with zero errors before committing.

## Code Rules

- **No magic numbers/strings** - every meaningful value should be a named constant
- **No console.log** - remove all debug logging before committing
- **No switch/case** - use Record lookups or match()
- **No try-catch for logging** - let errors bubble up or use attempt()
- **No unused imports** - remove them
- **No `any` type** - use `unknown` and narrow with type guards
- **No `as` assertions** - use type guards or redesign
- **No `interface`** - use `type`

## Component Rules

- One component per file
- Default export for the component
- Arrow functions only
- No `useMemo` or `useCallback`
- 'use client' only when needed (useState, useEffect, event handlers, browser APIs)
- Props type defined with `type` keyword, named `{ComponentName}Props`

## Naming

- Files/folders: kebab-case (except React components which are PascalCase)
- Types: PascalCase
- Variables/functions: camelCase
- Constants: camelCase (NOT UPPER_CASE)
- Event handlers: `handleXxx` internal, `onXxx` for props
- Predicates: `isXxx`, `hasXxx`, `shouldXxx`

## Git Commits

Use conventional commit format:
```
feat(reading): add moon phase calculation
fix(payment): handle PayPal timeout error
chore: update dependencies
```

Types: feat, fix, chore, refactor, docs, test, style, perf
