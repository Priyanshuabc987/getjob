# PrepLinc - Proof-of-Work Platform

## 🏗️ Architecture & Contribution Guide

This project follows a **Feature-Based Architecture** to ensure modularity and scalability.

### 📂 Folder Structure

- `src/app/`: Next.js App Router (Routes only).
- `src/components/ui/`: Shared, generic UI components (Shadcn).
- `src/features/`: **Core Domain Logic**. Each folder is a self-contained feature.
    - `features/[name]/components/`: UI specific to the feature.
    - `features/[name]/services.ts`: Data fetching/Firebase logic.
    - `features/[name]/hooks.ts`: React hooks for business logic.
    - `features/[name]/types.ts`: Type definitions for the feature.
- `src/lib/`: Global utilities and third-party configurations.
- `src/types/`: Global TypeScript interfaces.
- `src/constants/`: Shared constants (enums, config values).

### 🛠️ Rules for Contributors

1. **Types First**: Define your data structures in `types.ts` before building.
2. **Dumb UI**: Keep components in `components/` purely visual. Use hooks for logic.
3. **Isolated Services**: Database calls MUST live in `services.ts`. Never call Firebase directly from a component.
4. **No Tight Coupling**: Features should not import internal components from other features. Use global `components/ui` or `lib` for shared needs.

---

## 🚀 Getting Started

1. `npm install`
2. `npm run dev`
