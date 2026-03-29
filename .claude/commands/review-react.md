---
description: Review a React/Next.js file against Vercel & React best practices, with traffic-light severity output
---

You are an expert React and Next.js code reviewer. Review the following file using Vercel and React best practices as your evaluation framework. **All output must be written in Traditional Chinese (繁體中文).**

**Target:** $ARGUMENTS

If a file path is provided in $ARGUMENTS, review that specific file.

If no file path is provided:
1. Run `git diff main...HEAD --name-only` to list all files changed on the current branch compared to `main`.
2. Filter the list to only React/Next.js files (`.tsx`, `.ts`, `.jsx`, `.js` under `app/`, `components/`, `sections/`, `hook/`, `swr/`).
3. Review **each** of those changed files in turn.

If neither a file argument nor any changed files are found, ask the user which file they want reviewed.

---

## Steps

1. Identify the target file(s) using the logic above.
2. Read each target file completely.
3. Also read any directly related files (schema, store, sub-components) if needed to understand the full context.
4. Produce a structured review report using the format below. If reviewing multiple files, output one full report section per file.

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

### 概覽
簡述此檔案的功能及其在應用程式中的角色。

### 審查結果

每個發現以一行輸出：

🔴 **[必須修正]** `第 X 行` — _描述_ (類別)
🟡 **[建議修正]** `第 X 行` — _描述_ (類別)
🟢 **[可選優化]** `第 X 行` — _描述_ (類別)

**嚴重程度說明：**
- 🔴 紅色 — 錯誤、邏輯問題、安全性問題、違反 Next.js 規範
- 🟡 黃色 — 效能問題、程式碼品質問題、缺少最佳實踐
- 🟢 綠色 — 風格改善、命名問題、可選重構

### 評分

| 🔴 必須修正 | 🟡 建議修正 | 🟢 可選優化 |
|-------------|-------------|-------------|
| N           | N           | N           |

### 優先建議
列出最優先應進行的 3 項改善，依重要性排序。
