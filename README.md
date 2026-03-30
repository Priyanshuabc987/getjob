
# PrepLinc - Proof-of-Work Platform

## 🏗️ Architecture & Contribution Guide

This project follows a **Feature-Based Architecture** with strict data isolation.

### 📂 Folder Structure

- `src/app/`: Next.js App Router.
- `src/features/[name]/`: Core Domain Logic.
    - `components/`: UI specific to the feature.
    - `services/`: Data operations.
        - `read.ts`: GET operations with React/Next caching.
        - `write.ts`: SET/UPDATE operations with cache revalidation.
    - `types.ts`: Domain models.

### 🛠️ Strict Rules for Contributors

1. **Isolation & Modularity**:
   - No file should exceed **400-500 lines**.
   - Use `shared` folders for cross-sub-feature components.
2. **Server-First Rendering**:
   - Data fetching MUST happen on the **Server Side** using the `read.ts` services.
3. **Caching Strategy**:
   - Use the `reactCache` + `nextCache` (unstable_cache) pattern for all database reads.
   - Always include revalidation tags: `tags: ['user:${id}:profile']`.
4. **Data Privacy**:
   - Sensitive user information MUST live in `users_private` collection.
   - Public profiles live in `users`.
5. **Types First**: Define structures in `types.ts` before logic.

### 🚀 Caching Pattern Example
```ts
const getCachedData = cache((id: string) => {
  return unstable_cache(
    () => fetchFromDB(id),
    ['cache-key', id],
    { revalidate: 3600, tags: [`tag:${id}`] }
  )();
});
```
