# PrepLinc - Proof-of-Work Platform

## 🏗️ Architecture & Contribution Guide

This project follows a **Feature-Based Architecture** to ensure modularity and scalability.

### 📂 Folder Structure

- `src/app/`: Next.js App Router (Thin entry points only).
- `src/components/ui/`: Shared, generic UI components (Shadcn).
- `src/features/`: **Core Domain Logic**. Each folder is self-contained.
    - `features/[name]/components/`: UI specific to the feature.
    - `features/[name]/services.ts`: Data fetching/Firebase logic.
    - `features/[name]/hooks.ts`: React hooks for business logic.
    - `features/[name]/types.ts`: Type definitions for the feature.
    - `features/[name]/shared/`: Components shared across sub-features of this domain.

### 🛠️ Strict Rules for Contributors

1. **Isolation & Modularity**:
   - No file should exceed **400-500 lines of code**. If it does, break it into smaller components.
   - Every major section must be broken into reusable components within its feature folder.
2. **Server-First Rendering**:
   - Data fetching MUST happen on the **Server Side** whenever possible.
   - Use `page.tsx` for fetching and pass data to Client Components for interactivity.
3. **Design Consistency**:
   - Do NOT modify existing UI designs without explicit permission.
   - Use **Shared Components** (e.g., `ProjectCard`) across different views (Feed, Explore, Workspace) to maintain a unified aesthetic.
4. **Types First**: Define data structures in `types.ts` before implementing logic.
5. **No Hallucinations**: Do not assume a utility or component exists. Verify its existence in `components/ui` or `lib` before usage.
6. **Isolated Services**: Database calls MUST live in `services.ts`. Never call Firebase directly from a UI component.

---

## 🚀 Getting Started

1. `npm install`
2. `npm run dev`
