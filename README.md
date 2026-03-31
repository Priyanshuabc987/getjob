
# PrepLinc - Proof-of-Work Platform for Builders

## 🏗️ Technical Architecture & Strategy

This project is built on a **Feature-Based Architecture** designed for high modularity, security, and developer productivity.

### 📂 Folder Structure
- `src/app/`: Next.js App Router. Contains only **Routing, Layouts, and Server Entry Points**.
- `src/features/`: **Core Domain Logic**. Each domain is fully isolated.
    - `[feature]/components/`: Feature-specific UI.
    - `[feature]/services/`: Data access layer.
        - `read.ts`: **Server-Only** GET operations using dual-layer caching.
        - `write.ts`: **Server Actions** for all POST/PUT operations.
    - `[feature]/types.ts`: Domain models and TypeScript interfaces.
- `src/firebase/`: Standardized Firebase infrastructure (Auth, Firestore, and Hooks).
- `src/components/ui/`: Atomic Shadcn components.

### 🚀 Data Access & Caching Strategy
We use a **Dual-Layer Caching** pattern to ensure sub-100ms response times for user profiles.

1.  **React Cache (`reactCache`)**: Ensures data consistency within a single request (deduplication).
2.  **Next.js `unstable_cache` (`nextCache`)**: Persists data across multiple requests and users until revalidation.

#### Standard Caching Pattern:
```ts
// src/features/users/services/read.ts
export const getCachedUserProfile = reactCache(async (uid: string) => {
  return nextCache(
    () => fetchFromFirestore(uid),
    ['user-profile', uid],
    { revalidate: 3600, tags: [`user:${uid}:profile`] }
  )();
});
```

### 👤 User Data & Privacy Model
- **`users` (Public)**: Contains profile data used for networking (Display name, Role, Domains, Credibility).
- **`users_private` (Private)**: Contains sensitive PII (Email, Phone, Status). Blocked by strict Firestore Rules.

### 🛠️ Developer Rules & Guidelines
1.  **Server Actions First**: All data mutations **MUST** live in `write.ts` and use the `'use server'` directive.
2.  **No Direct Client Reads**: Never call `getDoc` directly in a Client Component. Always use a `read.ts` service or a provided hook (`useDoc`).
3.  **Responsive Layouts**: UI must be optimized for both Desktop (Sidebar) and Mobile (Bottom Nav).
4.  **Error Boundaries**: Every top-level route group MUST have an `error.js` and `not-found.js`.
5.  **Global User Fetching**: Use `getCachedUserProfile(uid)` for server-side profile data.

### 🔌 Standardized Hooks
- `useUser()`: Get the current authenticated user and their metadata.
- `useDoc(collection, id)`: Real-time client-side subscription to a document.
- `useCollection(query)`: Real-time client-side list fetching.

---
Built with ❤️ for the next generation of builders.
