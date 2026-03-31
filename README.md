
# PrepLinc - Proof-of-Work Platform

## 🏗️ Architecture & Contribution Guide

This project follows a **Feature-Based Architecture** with strict data isolation and server-first rendering.

### 📂 Folder Structure

- `src/app/`: Next.js App Router (Routing and Layouts only).
- `src/features/[name]/`: Core Domain Logic.
    - `components/`: UI specific to the feature.
    - `services/`: Data operations.
        - `read.ts`: GET operations with React/Next caching. MUST use `'use server'`.
        - `write.ts`: SET/UPDATE operations as Server Actions. MUST use `'use server'`.
    - `types.ts`: Domain models.

### 🛠️ Strict Rules for Contributors

1. **Isolation & Modularity**:
   - No file should exceed **400-500 lines**. If it does, break it into smaller components.
   - Use `shared` folders for cross-sub-feature components within a domain.
2. **Server-First Rendering**:
   - Data fetching MUST happen in **Server Components** using the `read.ts` services.
   - Avoid importing `unstable_cache` or `read.ts` directly into Client Components to prevent `incrementalCache` errors.
3. **Caching Strategy**:
   - Use the `reactCache` + `nextCache` (unstable_cache) pattern for all database reads.
   - Always include revalidation tags: `tags: ['user:${id}:profile']`.
4. **Data Privacy**:
   - Sensitive user information MUST live in `users_private` collection.
   - Public profiles live in `users`.
5. **Types First**: Define structures in `types.ts` before implementing logic.
6. **Responsiveness**:
   - UI must be optimized for both **Desktop** and **Mobile**.
   - Mobile navigation uses the Bottom Nav bar; Desktop uses the Sidebar.

### 🚀 Caching Pattern Example
```ts
// src/features/users/services/read.ts
export const getCachedUserProfile = reactCache(async (uid: string) => {
  return nextCache(
    () => fetchFromDB(uid),
    ['user-profile', uid],
    { revalidate: 3600, tags: [`user:${uid}:profile`] }
  )();
});
```

### 👤 User Data Access
Use `getCachedUserProfile(uid)` to fetch user profile data on the server. This ensures consistent, high-performance data across the platform.
