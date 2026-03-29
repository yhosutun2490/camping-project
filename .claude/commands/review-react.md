---
description: Review a React/Next.js file against Vercel & React best practices, with traffic-light severity output
---

You are an expert React and Next.js code reviewer. Review the following file using Vercel and React best practices as your evaluation framework.

**Target file:** $ARGUMENTS

If no file path is provided in $ARGUMENTS, ask the user which file they want reviewed before proceeding.

---

## Steps

1. Read the target file completely.
2. Also read any directly related files (schema, store, sub-components) if needed to understand the full context.
3. Produce a structured review report using the format below.

---

## Review Checklist

### React Best Practices
- Hooks rules: no conditional hooks, correct and complete `useEffect` / `useMemo` / `useCallback` dependency arrays
- Static data (arrays, objects, constants) defined **outside** the component to avoid re-creation on every render
- Unnecessary `useMemo` / `useCallback` wrapping with no real benefit
- Prop drilling — suggest Zustand store or Context where appropriate
- No `console.log`, `console.warn`, or debug artifacts left in production code
- Redundant optional chaining (`?.`) or nullish coalescing (`??`) on values guaranteed to exist

### Next.js / Vercel Best Practices
- `"use client"` directive — only add when truly needed (event handlers, hooks, browser APIs); prefer Server Components by default
- Data fetching — prefer server-side `fetch` or SWR hooks over manual `useEffect` + `setState` patterns
- Always use `next/navigation` (`useRouter`, `usePathname`, `useSearchParams`) — never `next/router`
- Images must use `next/image` for optimization
- Avoid heavy synchronous work blocking the main thread in Client Components
- URL search params: use `useSearchParams()` for reading, `router.push` / `router.replace` for writing

### TypeScript
- No implicit `any` types
- Exported props interfaces / types should be explicit and well-named
- Zod schemas should align 1:1 with their inferred TypeScript types — flag mismatches
- Avoid type assertions (`as`) unless justified

### General Code Quality
- DRY principle — identify copy-pasted or near-duplicate logic
- Unnecessary `try/catch` blocks wrapping code that cannot realistically throw
- Missing error handling at real system boundaries (API calls, user input)
- Dead code: unused variables, props, imports, or schema fields
- Naming clarity: props, variables, and functions should clearly express intent

### Performance
- Objects and arrays defined inline in JSX cause re-renders — move them out
- `key` prop correctness in lists (no index keys on dynamic lists)
- Large components that could benefit from `React.lazy` / `dynamic` import

---

## Output Format

### Overview
Brief description of what this file does and its role in the application.

### Review Findings

For each finding, output one line:

🔴 **[MUST FIX]** `line X` — _description_ (category)
🟡 **[SHOULD FIX]** `line X` — _description_ (category)
🟢 **[NICE TO HAVE]** `line X` — _description_ (category)

**Severity guide:**
- 🔴 Red — Bugs, logic errors, security issues, broken Next.js conventions
- 🟡 Yellow — Performance issues, code quality problems, missing best practices
- 🟢 Green — Style improvements, minor naming issues, optional refactors

### Score

| 🔴 Must Fix | 🟡 Should Fix | 🟢 Nice to Have |
|-------------|---------------|-----------------|
| N           | N             | N               |

### Top Recommendations
List the 3 most impactful changes to make first, in priority order.
