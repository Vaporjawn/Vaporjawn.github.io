# Gridiron Tactics Coding Guidelines

> **Purpose**: Comprehensive coding standards to maintain consistency, prevent
> refactoring, and ensure code quality across the entire codebase.

---

## Table of Contents

- [File Organization](#file-organization)
- [TypeScript Standards](#typescript-standards)
- [Import/Export Rules](#importexport-rules)
- [Service Layer (Data)](#service-layer-data)
- [React Components](#react-components)
- [React Hooks](#react-hooks)
- [Context Providers](#context-providers)
- [Error Handling & Logging](#error-handling--logging)
- [Documentation Standards](#documentation-standards)
- [Testing Standards](#testing-standards)
- [Common Anti-Patterns](#common-anti-patterns)
- [EditorConfig & Prettier Alignment](#editorconfig--prettier-alignment)
- [ESLint Configuration Adherence](#eslint-configuration-adherence)
- [Package.json Scripts & Tooling](#packagejson-scripts--tooling)
- [Vite Build Configuration](#vite-build-configuration)
- [PWA & Offline Support](#pwa--offline-support)
- [Project Metadata & Attribution](#project-metadata--attribution)

---

## File Organization

### Directory Structure Philosophy

**Services (Data Layer)**: Use modular function-based architecture

```
/src/data/serviceName/
├── types.ts              # ALWAYS FIRST - All interfaces, types, constants
├── constants.ts          # Optional - Shared constants
├── utils.ts              # Optional - Shared utilities
├── functionName.ts       # One function per file
├── anotherFunction.ts    # Each class method becomes a file
└── index.ts              # ALWAYS LAST - Centralized exports
```

**Components**: Co-locate related components, hooks, and utilities

```
/src/app/pages/PageName/
├── index.tsx             # Main page component
├── components/           # Page-specific components
│   ├── ComponentA.tsx
│   └── ComponentB.tsx
├── hooks/                # Page-specific hooks
│   ├── usePageData.ts
│   └── usePageViewModel.ts
└── utils/                # Page-specific utilities
    └── helpers.ts
```

**Shared Resources**: Centralize truly shared code

```
/src/shared/
├── components/           # Reusable UI components
├── types/                # Shared type definitions
├── utils/                # Utility functions
├── constants.ts          # Global constants
└── validation/           # Validation utilities
```

### File Naming Conventions

| Type                  | Convention                  | Example                                       |
| --------------------- | --------------------------- | --------------------------------------------- |
| **React Components**  | PascalCase                  | `TeamRoster.tsx`, `PlayerCard.tsx`            |
| **Functions/Modules** | camelCase                   | `getUserById.ts`, `calculateStats.ts`         |
| **Hooks**             | camelCase with `use` prefix | `useEnhancedData.ts`, `useValidatedParams.ts` |
| **Types/Interfaces**  | types.ts or PascalCase      | `types.ts`, `PlayerTypes.ts`                  |
| **Constants**         | constants.ts                | `constants.ts`                                |
| **Tests**             | Match source + `.test`      | `getUserById.test.ts`                         |
| **Config Files**      | kebab-case                  | `vite.config.ts`, `tsconfig.json`             |

### When to Refactor File Structure

**Refactor to modular when**:

- ✅ Service class exceeds **300 lines**
- ✅ Multiple unrelated responsibilities in single file
- ✅ Difficult to test due to tight coupling
- ✅ Poor separation of concerns

**Keep as single file when**:

- ✅ Under 300 lines and focused on single responsibility
- ✅ Methods are highly interdependent
- ✅ Simple utility modules with related functions

---

## TypeScript Standards

### Type Definition Organization

**RULE 1**: Define types in dedicated `types.ts` files

```typescript
// ✅ CORRECT - types.ts
/**
 * Type definitions for UserService
 * @module data/userService/types
 */

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserOptions {
  includeDeleted?: boolean;
}

export type UserStatus = 'active' | 'inactive' | 'suspended';

// Runtime constants that are used as types/values
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
```

**RULE 2**: Use `type` for unions, primitives, and aliases; `interface` for
objects

```typescript
// ✅ CORRECT
export type Status = 'active' | 'inactive';
export type UserId = string;

export interface User {
  id: UserId;
  status: Status;
}

// ❌ WRONG - Don't use interface for unions
export interface Status = 'active' | 'inactive'; // Syntax error
```

### Type Import/Export Patterns

**RULE 3**: Use `type` modifier for type-only imports/exports

```typescript
// ✅ CORRECT - Type-only import
import type { User, UserOptions } from './types';

// ✅ CORRECT - Type-only export
export type { User, UserOptions } from './types';

// ❌ WRONG - Value import for types
import { User, UserOptions } from './types';

// ❌ WRONG - Mixed type and value
import { User, getUserById } from './file'; // Don't mix
```

**RULE 4**: Separate type and value imports

```typescript
// ✅ CORRECT
import type { User } from './types';
import { getUserById } from './getUserById';

// ❌ WRONG
import { User, getUserById } from './file';
```

### TypeScript Compiler Options Alignment

**RULE 5A**: Understand enforced TypeScript settings from tsconfig.json

```typescript
// Strict Mode (ALL enabled):
- strict: true
- noImplicitAny: true
- strictNullChecks: true
- strictFunctionTypes: true
- strictBindCallApply: true
- strictPropertyInitialization: true
- noImplicitThis: true
- useUnknownInCatchVariables: true (catch errors are 'unknown')
- alwaysStrict: true

// Additional Type Checking:
- noUnusedLocals: true (unused variables are errors)
- noUnusedParameters: true (unused params are errors)
- exactOptionalPropertyTypes: true (undefined !== missing)
- noImplicitReturns: true (all code paths must return)
- noFallthroughCasesInSwitch: true (switch cases need break)
- noUncheckedIndexedAccess: true (array access returns T | undefined)
- noImplicitOverride: true (use 'override' keyword)
- allowUnusedLabels: false
- allowUnreachableCode: false

// Module Resolution:
- moduleResolution: 'bundler' (Vite-compatible)
- allowImportingTsExtensions: true (can import .ts files)
- resolveJsonModule: true (can import JSON)
- isolatedModules: true (each file must be independently transpilable)
```

**RULE 5B**: Array access always returns T | undefined

```typescript
// ✅ CORRECT - Handle potential undefined
const players = ['QB', 'RB', 'WR'];
const position = players[0]; // Type: string | undefined
if (position) {
  console.log(position); // Type: string
}

// ✅ CORRECT - Assert when you know it exists
const firstPlayer = players[0]!; // Non-null assertion

// ❌ WRONG - Treating array access as always defined
const position = players[0]; // string | undefined
console.log(position.toUpperCase()); // Error: Object is possibly undefined
```

**RULE 5C**: Catch clause variables are 'unknown' (not 'any')

```typescript
// ✅ CORRECT - Type guard for error
try {
  await riskyOperation();
} catch (error) {
  // error is 'unknown', must narrow type
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error('Unknown error:', error);
  }
}

// ❌ WRONG - Assuming error is Error
try {
  await riskyOperation();
} catch (error) {
  console.error(error.message); // Error: 'error' is of type 'unknown'
}
```

### Type Annotations

**RULE 5**: Annotate function parameters and return types explicitly

```typescript
// ✅ CORRECT
export async function getUserById(
  client: DataClient,
  id: string
): Promise<User | null> {
  // ...
}

// ❌ WRONG - Missing return type
export async function getUserById(client: DataClient, id: string) {
  // ...
}
```

**RULE 6**: Let TypeScript infer variable types when obvious

```typescript
// ✅ CORRECT - Inference is clear
const count = 0;
const userName = 'John';
const isActive = true;

// ✅ CORRECT - Annotate when not obvious
const [user, setUser] = useState<User | null>(null);
const data: ComplexType = parseData(rawData);

// ❌ WRONG - Redundant annotation
const count: number = 0;
```

### Avoid `any` and Proper Typing

**RULE 7**: Use `unknown` instead of `any` when type is uncertain

```typescript
// ✅ CORRECT
function handleError(error: unknown) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}

// ❌ WRONG
function handleError(error: any) {
  console.error(error.message); // No type safety
}
```

**RULE 8**: Use generics for reusable type-safe functions

```typescript
// ✅ CORRECT
export function useDataCache<T>(
  key: string,
  fetcher: () => Promise<T>
): CacheResult<T> {
  // ...
}

// ❌ WRONG
export function useDataCache(
  key: string,
  fetcher: () => Promise<any>
): CacheResult<any> {
  // ...
}
```

### Null Safety

**RULE 9**: Use strict null checks and optional chaining

```typescript
// ✅ CORRECT
const teamName = league?.team?.name ?? 'Unknown';

if (user?.isActive) {
  // ...
}

// ❌ WRONG
const teamName = league.team.name || 'Unknown'; // May throw
```

**RULE 10**: Use assertion functions for validation

```typescript
// ✅ CORRECT
import { assertExists } from '@/shared/validation';

function processUser(user: User | null) {
  assertExists(user, 'User must exist');
  // TypeScript knows user is non-null here
  console.log(user.name);
}

// ❌ WRONG
function processUser(user: User | null) {
  console.log(user!.name); // Non-null assertion without check
}
```

---

## Import/Export Rules

### Import Ordering (ESLint Enforced)

**CRITICAL**: Imports MUST follow this exact order with blank lines:

```typescript
// 1. External type imports
import type { ReactNode } from 'react';

// 2. BLANK LINE

// 3. External value imports
import { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// 4. BLANK LINE

// 5. Internal imports (parent directories)
import { getUserById } from '../../data/userService';

import type { DataClient } from '../../data/client';

// 6. BLANK LINE

// 7. Local imports (same directory)
import { CONSTANTS } from './constants';

import type { LocalType } from './types';
```

**Common Import Patterns**:

```typescript
// ✅ CORRECT - Type imports first, then value imports
import type { User, Team } from './types';

import { getUserById } from './getUserById';
import { STORAGE_KEY } from './constants';

// ❌ WRONG - Mixed type and value
import { User, getUserById } from './file';

// ❌ WRONG - Value import for type
import { User } from './types'; // User is a type
```

### Blank Line Rules

**RULE 11**: Blank lines in imports

- ✅ **Required**: Between type imports and value imports
- ✅ **Required**: Between import sections and code
- ❌ **Not allowed**: Within type import group
- ❌ **Not allowed**: Within value import group

```typescript
// ✅ CORRECT
import type { User } from './types';
import type { DataClient } from '../client';

import { getUser } from './getUser';
import { CONSTANT } from './constants';

export async function myFunction() {
  // ...
}

// ❌ WRONG - Blank line within group
import type { User } from './types';

import type { DataClient } from '../client';
```

### Export Patterns

**RULE 12**: Use named exports (avoid default exports except for
pages/components)

```typescript
// ✅ CORRECT - Named exports
export function getUserById() {}
export interface User {}

// ✅ ACCEPTABLE - Default export for React components/pages
export default function Dashboard() {}

// ❌ WRONG - Default export for utilities/services
export default function getUserById() {}
```

**RULE 12A**: Use TypeScript path aliases (tsconfig.json)

```typescript
// Configured path aliases:
'@gridiron/shared/*' → 'src/shared/*'
'@gridiron/data/*' → 'src/data/*'
'@gridiron/engine/*' → 'src/engine/*'
'@gridiron/app/*' → 'src/app/*'
'@/*' → 'src/*'

// ✅ CORRECT - Use path aliases for imports
import { logger } from '@gridiron/shared/logger';
import { getUserById } from '@gridiron/data/userService';
import { simulateGame } from '@gridiron/engine/simulation';
import { Dashboard } from '@gridiron/app/pages/Dashboard';
import { utilities } from '@/utils/helpers';

// ❌ WRONG - Relative path when alias exists
import { logger } from '../../../shared/logger';
import { getUserById } from '../../data/userService';

// ✅ ACCEPTABLE - Relative for same directory or close siblings
import { UserCard } from './UserCard';
import { useUser } from '../hooks/useUser';
```

**RULE 13**: Centralize exports in index.ts

```typescript
// ✅ CORRECT - index.ts
export type { User, UserOptions } from './types';

export { getUserById } from './getUserById';
export { createUser } from './createUser';
export { updateUser } from './updateUser';

// ❌ WRONG - Direct imports from internal files
import { getUserById } from './userService/getUserById'; // Should use index
```

**RULE 14**: Separate type and value exports

```typescript
// ✅ CORRECT
export type { User, Team } from './types';
export { getUserById, getTeamById } from './service';

// ❌ WRONG - Mixed exports
export { User, getUserById } from './file';
```

---

## Service Layer (Data)

### Modular Function-Based Architecture

**RULE 15**: Write pure functions, not classes

```typescript
// ✅ CORRECT - Pure function with client parameter
import type { DataClient } from '../client';
import type { User } from './types';

export async function getUserById(
  client: DataClient,
  id: string
): Promise<User | null> {
  const rows = await client.query<User>('SELECT * FROM users WHERE id = ?', [
    id,
  ]);
  return rows.length > 0 ? rows[0] : null;
}

// ❌ WRONG - Class-based service
export class UserService {
  constructor(private client: DataClient) {}

  async getUserById(id: string): Promise<User | null> {
    // ...
  }
}
```

### File Structure for Services

**RULE 16**: Create files in this order

1. **types.ts** - FIRST (all interfaces, types, constants)
2. **constants.ts** - If needed (shared constants)
3. **utils.ts** - If needed (shared utilities)
4. **Function files** - One per method
5. **index.ts** - LAST (centralized exports)

### Function Parameters

**RULE 17**: First parameter MUST be dependencies (client, services, etc.)

```typescript
// ✅ CORRECT - Client first
export async function getUserById(
  client: DataClient,
  id: string
): Promise<User | null> {
  // ...
}

// ✅ CORRECT - Multiple dependencies
export async function processUser(
  client: DataClient,
  notificationService: NotificationService,
  userId: string
): Promise<void> {
  // ...
}

// ❌ WRONG - Dependencies not first
export async function getUserById(
  id: string,
  client: DataClient
): Promise<User | null> {
  // ...
}
```

### Synchronous vs Asynchronous Functions

**RULE 18**: localStorage/synchronous operations don't need client

```typescript
// ✅ CORRECT - No client for localStorage
import { REGISTRY_KEY } from './constants';

import type { Entry } from './types';

export function getRegistry(): Entry[] {
  try {
    const stored = localStorage.getItem(REGISTRY_KEY);
    if (!stored) {
      return [];
    }
    return JSON.parse(stored) as Entry[];
  } catch (error) {
    console.error('[ServiceName] Failed to read registry:', error);
    return [];
  }
}

// ❌ WRONG - Client parameter for sync operation
export function getRegistry(client: DataClient): Entry[] {
  // localStorage doesn't need client
}
```

### Error Handling in Services

**RULE 19**: Handle errors gracefully, don't swallow silently

```typescript
// ✅ CORRECT - Log and handle errors
import { logger } from '@/shared/logger';

export async function getUserById(
  client: DataClient,
  id: string
): Promise<User | null> {
  try {
    const rows = await client.query<User>('SELECT * FROM users WHERE id = ?', [
      id,
    ]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    await logger.error(
      'UserService',
      `Failed to fetch user by ID: ${id}`,
      {
        process: 'getUserById',
        userId: id,
        nextSteps: 'Check database connection and query syntax',
      },
      error
    );
    throw error; // Re-throw for caller to handle
  }
}

// ❌ WRONG - Silent error swallowing
export async function getUserById(
  client: DataClient,
  id: string
): Promise<User | null> {
  try {
    // ...
  } catch (error) {
    return null; // Error lost
  }
}
```

---

## React Components

### Component Structure

**RULE 20**: Follow consistent component structure

```typescript
/**
 * Component description
 * @module app/components/ComponentName
 */

// 1. Imports (follow import ordering rules)
import { useState } from 'react';

import { Box, Typography } from '@mui/material';

import { useData } from '../contexts/DataContext';

// 2. Types/Interfaces
interface ComponentProps {
  title: string;
  onSave?: () => void;
}

// 3. Constants (if component-specific)
const DEFAULT_TITLE = 'Untitled';

// 4. Component
export function ComponentName({ title, onSave }: ComponentProps) {
  // 4a. Hooks (all at top)
  const { client } = useData();
  const [loading, setLoading] = useState(false);

  // 4b. Derived state / memoization
  const processedTitle = title || DEFAULT_TITLE;

  // 4c. Event handlers
  const handleSave = () => {
    if (onSave) {
      onSave();
    }
  };

  // 4d. Effects
  useEffect(() => {
    // ...
  }, []);

  // 4e. Early returns (loading, error states)
  if (loading) {
    return <div>Loading...</div>;
  }

  // 4f. Main render
  return (
    <Box>
      <Typography>{processedTitle}</Typography>
    </Box>
  );
}
```

### Props Interface

**RULE 21**: Define props with interface, not inline types

```typescript
// ✅ CORRECT
interface PlayerCardProps {
  playerId: string;
  showStats?: boolean;
  onSelect?: (id: string) => void;
}

export function PlayerCard({ playerId, showStats, onSelect }: PlayerCardProps) {
  // ...
}

// ❌ WRONG - Inline props
export function PlayerCard({
  playerId,
  showStats,
  onSelect,
}: {
  playerId: string;
  showStats?: boolean;
  onSelect?: (id: string) => void;
}) {
  // ...
}
```

### Component Size and Complexity

**RULE 22**: Extract complex components into smaller pieces

```typescript
// ✅ CORRECT - Broken into smaller components
export function Dashboard() {
  return (
    <Box>
      <DashboardHeader />
      <DashboardContent />
      <DashboardFooter />
    </Box>
  );
}

// ❌ WRONG - 500+ line monolithic component
export function Dashboard() {
  return (
    <Box>
      {/* 500 lines of complex JSX */}
    </Box>
  );
}
```

**Thresholds**:

- Component > 300 lines → Extract sub-components
- JSX nesting > 5 levels → Extract sub-components
- Multiple `useEffect` hooks → Consider custom hook

### Conditional Rendering

**RULE 23**: Use proper conditional rendering patterns

```typescript
// ✅ CORRECT - Ternary for either/or
{isLoading ? <Spinner /> : <Content />}

// ✅ CORRECT - && for conditional display
{user && <UserProfile user={user} />}

// ✅ CORRECT - Early return for guards
if (!data) {
  return <EmptyState />;
}

return <DataView data={data} />;

// ❌ WRONG - Nested ternaries
{loading ? <Spinner /> : error ? <Error /> : data ? <Content /> : <Empty />}

// ✅ BETTER - Extract logic
const renderContent = () => {
  if (loading) {return <Spinner />;}
  if (error) {return <Error />;}
  if (!data) {return <Empty />;}
  return <Content />;
};

return renderContent();
```

### Event Handlers

**RULE 24**: Use proper event handler patterns

```typescript
// ✅ CORRECT - Inline for simple handlers
<Button onClick={() => setCount(count + 1)}>Increment</Button>

// ✅ CORRECT - Named function for complex handlers
const handleSubmit = async () => {
  setLoading(true);
  try {
    await saveData(formData);
    showNotification('Saved successfully');
  } catch (error) {
    showError('Failed to save');
  } finally {
    setLoading(false);
  }
};

<Button onClick={handleSubmit}>Save</Button>

// ✅ CORRECT - useCallback for handlers passed as props
const handleSelect = useCallback((id: string) => {
  onSelect?.(id);
}, [onSelect]);

<ChildComponent onSelect={handleSelect} />

// ❌ WRONG - Complex logic inline
<Button onClick={async () => {
  setLoading(true);
  try {
    // 20 lines of complex logic
  } catch (error) {
    // error handling
  }
}}>
  Submit
</Button>
```

---

## React Hooks

### Hook Organization

**RULE 25**: Create custom hooks for reusable logic

```typescript
// ✅ CORRECT - Custom hook extracts complex logic
/**
 * Hook for managing dashboard data with caching
 * @module app/hooks/useDashboardData
 */
export function useDashboardData() {
  const { client, databaseReady } = useData();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!client || !databaseReady) {
      return;
    }

    const loadData = async () => {
      // Complex data loading logic
    };

    void loadData();
  }, [client, databaseReady]);

  return { data, loading };
}

// ❌ WRONG - All logic in component
export function Dashboard() {
  const { client, databaseReady } = useData();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 50 lines of data loading logic
  }, [client, databaseReady]);

  // Component continues...
}
```

### Hook Dependencies

**RULE 26**: Properly manage useEffect dependencies

```typescript
// ✅ CORRECT - All dependencies listed
useEffect(() => {
  if (!client || !userId) {
    return;
  }

  const loadUser = async () => {
    const user = await getUserById(client, userId);
    setUser(user);
  };

  void loadUser();
}, [client, userId]); // All used values in deps

// ❌ WRONG - Missing dependencies
useEffect(() => {
  const loadUser = async () => {
    const user = await getUserById(client, userId);
    setUser(user);
  };

  void loadUser();
}, []); // Missing client, userId

// ✅ CORRECT - Early return pattern
useEffect(() => {
  if (!client || !databaseReady) {
    return; // Guard clause
  }

  // Effect logic here
}, [client, databaseReady]);
```

### useState Patterns

**RULE 27**: Use proper state initialization and updates

```typescript
// ✅ CORRECT - Type annotation for complex state
const [user, setUser] = useState<User | null>(null);
const [filters, setFilters] = useState<FilterConfig>({
  sort: 'name',
  order: 'asc',
});

// ✅ CORRECT - Functional updates for state based on previous
setCount((prevCount) => prevCount + 1);

// ❌ WRONG - Direct state reference in updater
setCount(count + 1); // Can be stale in async context

// ✅ CORRECT - Separate state for independent values
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');

// ❌ WRONG - One state for related but independently updated values
const [formData, setFormData] = useState({ firstName: '', lastName: '' });
// Then: setFormData({ ...formData, firstName: 'John' }); // Verbose
```

### useCallback and useMemo

**RULE 28**: Use memoization appropriately

```typescript
// ✅ CORRECT - useMemo for expensive computations
const sortedPlayers = useMemo(() => {
  return players.sort((a, b) => b.overall - a.overall);
}, [players]);

// ✅ CORRECT - useCallback for functions passed as props
const handlePlayerSelect = useCallback(
  (playerId: string) => {
    onSelect?.(playerId);
  },
  [onSelect]
);

// ❌ WRONG - Unnecessary memoization
const userName = useMemo(() => user.name, [user]); // Too simple
const handleClick = useCallback(() => setCount(0), []); // Not passed as prop

// ✅ CORRECT - Don't memoize for simple cases
const userName = user.name;
const handleClick = () => setCount(0);
```

### Custom Hook Patterns

**RULE 29**: Follow custom hook best practices

```typescript
// ✅ CORRECT - Custom hook structure
/**
 * Hook for fetching and caching player data
 */
export function usePlayerData(playerId: string | null) {
  const { client } = useData();
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!playerId || !client) {
      setPlayer(null);
      return;
    }

    const loadPlayer = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPlayerById(client, playerId);
        setPlayer(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    void loadPlayer();
  }, [playerId, client]);

  return { player, loading, error };
}

// ❌ WRONG - Hook doesn't handle loading/error states
export function usePlayerData(playerId: string) {
  const [player, setPlayer] = useState<Player | null>(null);

  useEffect(() => {
    getPlayerById(playerId).then(setPlayer);
  }, [playerId]);

  return player; // What about loading? errors?
}
```

---

## Context Providers

### Context Structure

**RULE 30**: Separate context definition and provider

```typescript
// ✅ CORRECT - LeagueContextDefinition.ts
import { createContext } from 'react';

import type { LeagueInfo } from '../../data';

export interface LeagueContextValue {
  leagueInfo: LeagueInfo | null;
  userTeamId: string | null;
  loading: boolean;
  refreshLeagueInfo: () => Promise<void>;
}

export const LeagueContext = createContext<LeagueContextValue | undefined>(
  undefined
);

// ✅ CORRECT - LeagueContext.tsx
import { useState, useCallback, useEffect } from 'react';

import { LeagueContext } from './LeagueContextDefinition';
import { getLeagueInfo } from '../../data/leagueService';

export function LeagueProvider({ children }: { children: ReactNode }) {
  const [leagueInfo, setLeagueInfo] = useState<LeagueInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // Provider implementation...

  return (
    <LeagueContext.Provider value={{ leagueInfo, loading }}>
      {children}
    </LeagueContext.Provider>
  );
}

// ✅ CORRECT - useLeague.ts
import { useContext } from 'react';

import { LeagueContext } from './LeagueContextDefinition';

export function useLeague() {
  const context = useContext(LeagueContext);

  if (!context) {
    throw new Error('useLeague must be used within LeagueProvider');
  }

  return context;
}
```

### Context Value Memoization

**RULE 31**: Memoize context values to prevent unnecessary re-renders

```typescript
// ✅ CORRECT - Memoized context value
export function DataProvider({ children }: { children: ReactNode }) {
  const [client, setClient] = useState<DataClient | null>(null);
  const [ready, setReady] = useState(false);

  const value = useMemo(
    () => ({ client, ready }),
    [client, ready]
  );

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

// ❌ WRONG - New object every render
export function DataProvider({ children }: { children: ReactNode }) {
  const [client, setClient] = useState<DataClient | null>(null);
  const [ready, setReady] = useState(false);

  return (
    <DataContext.Provider value={{ client, ready }}>
      {children}
    </DataContext.Provider>
  );
}
```

### Context Hook Validation

**RULE 32**: Always validate context exists

```typescript
// ✅ CORRECT - Proper error handling
export function useData() {
  const context = useContext(DataContext);

  if (!context) {
    const error = new Error(
      '[useData] Hook must be used within a DataProvider. ' +
        'Missing <DataProvider> wrapper in component tree.'
    );
    logger.error(
      'DataContext',
      error.message,
      {
        process: 'useData',
        contextFound: false,
        nextSteps: 'Ensure component is wrapped with <DataProvider>',
      },
      error
    );
    throw error;
  }

  return context;
}

// ❌ WRONG - No validation
export function useData() {
  return useContext(DataContext);
}
```

---

## Error Handling & Logging

### Structured Logging

**RULE 33**: Use structured logging with context

```typescript
import { logger } from '@/shared/logger';

// ✅ CORRECT - Structured logging with context
await logger.info('UserService', 'User fetched successfully', {
  process: 'getUserById',
  userId: id,
  nextSteps: 'Return user data to caller',
});

await logger.error(
  'UserService',
  'Failed to fetch user',
  {
    process: 'getUserById',
    userId: id,
    errorType: 'DatabaseError',
    nextSteps: 'Check database connection and retry',
  },
  error
);

// ❌ WRONG - Plain console.log
console.log('User fetched:', user);
console.error('Error:', error);
```

### Logging Levels

**RULE 34**: Use appropriate log levels

```typescript
// DEBUG - Detailed diagnostic information
await logger.debug('ServiceName', 'Processing started', { step: 1 });

// INFO - General informational messages
await logger.info('ServiceName', 'Operation completed successfully', {
  count: 10,
});

// WARN - Warning messages (recoverable issues)
await logger.warn('ServiceName', 'Deprecated API used', { api: 'oldMethod' });

// ERROR - Error messages (failures)
await logger.error(
  'ServiceName',
  'Operation failed',
  { reason: 'timeout' },
  error
);

// CRITICAL - Critical errors (system failures)
await logger.critical('ServiceName', 'Database connection lost', {}, error);
```

### Promise Handling

**RULE 35**: Never leave promises floating

```typescript
// ✅ CORRECT - Await async functions
await logger.info('Service', 'Message');
await saveData(data);

// ✅ CORRECT - Explicitly void for fire-and-forget
void logger.info('Service', 'Message');

// ✅ CORRECT - Handle with .catch()
saveData(data).catch((error) => {
  console.error('Failed to save:', error);
});

// ❌ WRONG - Floating promise (ESLint error)
logger.info('Service', 'Message'); // @typescript-eslint/no-floating-promises
```

### Try-Catch Patterns

**RULE 36**: Use proper error handling patterns

```typescript
// ✅ CORRECT - Try-catch with finally
export async function saveUser(client: DataClient, user: User): Promise<void> {
  try {
    await client.query('INSERT INTO users VALUES (?)', [user]);
    await logger.info('UserService', 'User saved', { userId: user.id });
  } catch (error) {
    await logger.error(
      'UserService',
      'Failed to save user',
      { userId: user.id },
      error
    );
    throw error; // Re-throw for caller
  } finally {
    // Cleanup if needed
  }
}

// ❌ WRONG - Catching and swallowing errors
export async function saveUser(client: DataClient, user: User): Promise<void> {
  try {
    await client.query('INSERT INTO users VALUES (?)', [user]);
  } catch (error) {
    // Error lost - caller has no idea it failed
  }
}
```

### Error Boundaries (React)

**RULE 37**: Use error boundaries for component errors

```typescript
// ✅ CORRECT - Error boundary for page sections
<ErrorBoundary fallback={<ErrorFallback />}>
  <ComplexComponent />
</ErrorBoundary>

// Component can throw errors safely
export function ComplexComponent() {
  if (!data) {
    throw new Error('Data required');
  }

  return <div>{data.content}</div>;
}
```

---

## Documentation Standards

### File-Level JSDoc

**RULE 38**: Every file MUST have module-level documentation

```typescript
/**
 * User service functions for managing user data
 * Provides CRUD operations and user-related queries
 * @module data/userService
 */

import type { DataClient } from '../client';
// ...rest of file
```

### Function Documentation

**RULE 39**: Document all exported functions comprehensively

```typescript
/**
 * Retrieve a user by their unique identifier
 *
 * Queries the database for a user with the specified ID.
 * Returns null if no user is found.
 *
 * @param client - DataClient instance for database operations
 * @param id - Unique user identifier
 * @returns User object if found, null otherwise
 * @throws {Error} If database query fails
 *
 * @example
 * const user = await getUserById(client, 'user-123');
 * if (user) {
 *   console.log(user.name);
 * }
 *
 * @example
 * // Handle non-existent user
 * const user = await getUserById(client, 'invalid-id');
 * if (!user) {
 *   console.log('User not found');
 * }
 */
export async function getUserById(
  client: DataClient,
  id: string
): Promise<User | null> {
  // Implementation
}
```

### Interface Documentation

**RULE 40**: Document complex interfaces and types

```typescript
/**
 * Represents a player in the game
 */
export interface Player {
  /** Unique player identifier */
  id: string;

  /** Player's full name */
  name: string;

  /** Player's position (QB, RB, WR, etc.) */
  position: Position;

  /** Overall rating (0-100) */
  overall: number;

  /**
   * Player's contract information
   * Null if player is unsigned
   */
  contract: Contract | null;
}
```

### Inline Comments

**RULE 41**: Use inline comments for complex logic only

```typescript
// ✅ CORRECT - Explains non-obvious logic
// Calculate pro-rated bonus for partial season
const proRatedBonus = (bonus / 17) * remainingGames;

// ✅ CORRECT - Explains workaround
// WORKAROUND: SQLite doesn't support RETURNING clause
// Query again to get inserted ID
const insertedId = await client.query('SELECT last_insert_rowid()');

// ❌ WRONG - Obvious comments
// Set count to 0
const count = 0;

// Loop through users
for (const user of users) {
  // ...
}
```

---

## Testing Standards

### Test File Organization

**RULE 42**: Co-locate tests with source files

```
/src/data/userService/
├── getUserById.ts
├── getUserById.test.ts
├── createUser.ts
├── createUser.test.ts
└── index.ts
```

### Test Structure

**RULE 43**: Use AAA pattern (Arrange, Act, Assert)

```typescript
import { describe, it, expect, beforeEach } from 'vitest';

describe('getUserById', () => {
  let client: DataClient;

  beforeEach(() => {
    // Setup
    client = createTestClient();
  });

  it('should return user when found', async () => {
    // Arrange
    const userId = 'test-user-1';
    await client.query('INSERT INTO users VALUES (?)', [{ id: userId }]);

    // Act
    const result = await getUserById(client, userId);

    // Assert
    expect(result).toBeDefined();
    expect(result?.id).toBe(userId);
  });

  it('should return null when user not found', async () => {
    // Arrange
    const userId = 'non-existent';

    // Act
    const result = await getUserById(client, userId);

    // Assert
    expect(result).toBeNull();
  });
});
```

### Vitest Configuration Alignment

**RULE 44A**: Understand enforced test coverage thresholds

```typescript
// Global Coverage Requirements (vitest.config.ts):
- Branches: 70%
- Functions: 70%
- Lines: 75%
- Statements: 75%

// Critical Path Coverage (HIGHER requirements):
// src/data/** (Data Layer):
- Branches: 80%
- Functions: 80%
- Lines: 85%
- Statements: 85%

// src/engine/** (Game Engine):
- Branches: 85%
- Functions: 85%
- Lines: 90%
- Statements: 90%
```

**RULE 44B**: Use Vitest globals and setup

```typescript
// ✅ CORRECT - Globals enabled in vitest.config.ts
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
// Can also use without imports (globals: true)

describe('MyComponent', () => {
  beforeEach(() => {
    // Setup before each test
  });

  it('should render correctly', () => {
    // Test implementation
  });
});

// Test environment: jsdom (browser-like)
// Setup files: ./src/test/setup.ts (auto-loaded)
```

**RULE 44C**: Test file patterns and timeouts

```typescript
// Test file patterns (auto-discovered):
- **/*.test.ts
- **/*.test.tsx
- **/*.spec.ts
- **/*.spec.tsx

// Timeouts:
- testTimeout: 10000ms (10 seconds)
- hookTimeout: 10000ms (10 seconds)

// ✅ CORRECT - Override timeout for slow tests
it('should handle slow operation', async () => {
  // Test implementation
}, { timeout: 20000 }); // 20 seconds
```

**RULE 44D**: Coverage exclusions (automatically ignored)

```typescript
// Files excluded from coverage:
- **/*.d.ts (type definitions)
- **/*.test.{ts,tsx} (test files)
- **/*.spec.{ts,tsx} (spec files)
- src/test/** (test utilities)
- **/__tests__/** (test directories)
- **/__mocks__/** (mock directories)
- node_modules/** (dependencies)
```

### Test Coverage

**RULE 44**: Test critical paths and edge cases

```typescript
// Test normal cases
it('should handle valid input');

// Test edge cases
it('should handle empty string');
it('should handle null input');
it('should handle undefined input');

// Test error cases
it('should throw error for invalid data');
it('should handle database errors gracefully');

// Test boundary conditions
it('should handle maximum value');
it('should handle minimum value');
```

---

## Common Anti-Patterns

### Anti-Pattern 1: Prop Drilling

**Problem**: Passing props through many layers

```typescript
// ❌ WRONG
<GrandParent userId={userId}>
  <Parent userId={userId}>
    <Child userId={userId}>
      <GrandChild userId={userId} />
    </Child>
  </Parent>
</GrandParent>

// ✅ CORRECT - Use context
const UserContext = createContext<{ userId: string } | undefined>(undefined);

<UserProvider userId={userId}>
  <GrandParent>
    <Parent>
      <Child>
        <GrandChild />
      </Child>
    </Parent>
  </GrandParent>
</UserProvider>
```

### Anti-Pattern 2: God Components

**Problem**: Components doing too much

```typescript
// ❌ WRONG - 800 line component
export function Dashboard() {
  // 50 useState calls
  // 20 useEffect hooks
  // Complex business logic
  // 500 lines of JSX
}

// ✅ CORRECT - Extracted into smaller pieces
export function Dashboard() {
  const { data, loading } = useDashboardData(); // Custom hook
  const viewModel = useDashboardViewModel(data); // Business logic

  return (
    <Box>
      <DashboardHeader />
      <DashboardStats stats={viewModel.stats} />
      <DashboardCharts data={viewModel.charts} />
    </Box>
  );
}
```

### Anti-Pattern 3: Inline Object/Array Creation in JSX

**Problem**: Creating new references every render

```typescript
// ❌ WRONG - New array every render
<DataTable columns={['name', 'email', 'role']} />

// ✅ CORRECT - Stable reference
const COLUMNS = ['name', 'email', 'role'];
<DataTable columns={COLUMNS} />

// ❌ WRONG - New object every render
<UserProfile config={{ theme: 'dark', compact: true }} />

// ✅ CORRECT - useMemo or constant
const config = useMemo(() => ({ theme: 'dark', compact: true }), []);
<UserProfile config={config} />
```

### Anti-Pattern 4: Mutating State Directly

**Problem**: Modifying state without setState

```typescript
// ❌ WRONG
const [users, setUsers] = useState<User[]>([]);
users.push(newUser); // Direct mutation
setUsers(users); // React won't detect change

// ✅ CORRECT
const [users, setUsers] = useState<User[]>([]);
setUsers([...users, newUser]); // New array

// ✅ CORRECT - Functional update
setUsers((prevUsers) => [...prevUsers, newUser]);
```

### Anti-Pattern 5: Using Index as Key

**Problem**: Using array index for React keys

```typescript
// ❌ WRONG - Index as key
{players.map((player, index) => (
  <PlayerCard key={index} player={player} />
))}

// ✅ CORRECT - Unique ID as key
{players.map(player => (
  <PlayerCard key={player.id} player={player} />
))}
```

---

## EditorConfig & Prettier Alignment

### File Formatting Standards

**RULE 46**: Follow EditorConfig settings automatically enforced

```typescript
// ✅ CORRECT - Adheres to .editorconfig
- charset: utf-8
- end_of_line: lf (Unix line endings)
- insert_final_newline: true
- trim_trailing_whitespace: true
- indent_style: space
- indent_size: 2

// All TypeScript/JavaScript files use:
- Single quotes for strings
- Max line length: 100 characters
- Semicolons: true
- Trailing commas: ES5 style
```

### Prettier Configuration

**RULE 47**: Prettier auto-formats all files - DO NOT fight it

```typescript
// ✅ CORRECT - Let Prettier handle formatting
npm run format        // Format all files
npm run format:check  // Check formatting without changes

// Prettier settings (automatic):
- Semi: true (always use semicolons)
- Single Quote: true
- Trailing Comma: 'es5'
- Tab Width: 2
- Print Width: 100
- Arrow Parens: 'always'
- Bracket Spacing: true
- JSX Single Quote: false
- End of Line: 'lf'
```

### Line Length Guidelines

**RULE 48**: Respect max line length per file type

```typescript
// TypeScript/JavaScript: 100 characters max
export function myFunction(param1: string, param2: number): ReturnType {
  // Code here
}

// JSON files: 80 characters max
{
  "key": "value",
  "another": "value"
}

// Markdown files: 80 characters (prose wrap: always)
This is a markdown paragraph that will wrap at 80 characters for better
readability in plain text editors.

// Config files: 100 characters max
// package.json: 120 characters max (exception)
```

### File-Specific Overrides

**RULE 49**: Understand Prettier overrides for different file types

```json
// .json files - 80 char limit, no trailing commas
{
  "shortKey": "value"
}

// .md files - Prose wrap always, 80 char limit

// .yml/.yaml files - 2 space indent, 80 char limit

// .css/.scss files - 4 space indent, 120 char limit

// .html files - 2 space indent, 100 char limit

// .tsx/.jsx files - 2 space indent, 100 char limit, no single quotes in JSX
```

## ESLint Configuration Adherence

### Critical ESLint Rules to Follow

**React Hooks**:

- ✅ `react-hooks/rules-of-hooks`: Follow hooks rules
- ✅ `react-hooks/exhaustive-deps`: Include all dependencies

**TypeScript**:

- ✅ `@typescript-eslint/no-floating-promises`: Await or void promises
- ✅ `@typescript-eslint/consistent-type-imports`: Use `import type`
- ✅ `@typescript-eslint/no-unnecessary-condition`: Remove redundant checks
- ✅ `@typescript-eslint/prefer-nullish-coalescing`: Use `??` over `||`

**React**:

- ✅ `react/jsx-no-constructed-context-values`: Memoize context values
- ✅ `react/hook-use-state`: Use proper useState patterns

**Imports**:

- ✅ `import/order`: Follow import ordering rules
- ✅ `import/no-cycle`: Avoid circular dependencies
- ✅ `import/no-duplicates`: Combine duplicate imports

### Disabling Rules (When Acceptable)

**RULE 45**: Only disable rules with justification

```typescript
// ✅ ACCEPTABLE - With explanation
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// Legacy API requires any type for dynamic data structure
function legacyApi(data: any) {}

// ❌ WRONG - No explanation
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getData(data: any) {}
```

---

## Package.json Scripts & Tooling

### Development Scripts

**RULE 50**: Use standardized npm scripts (package.json)

```bash
# Development
npm run dev              # Start dev server (port 5173)
npm run dev:host         # Start with network access
npm run dev:debug        # Start with debug logging
npm run dev:force        # Force rebuild cache

# Building
npm run build            # Full production build with type checking
npm run build:prod       # Production build (NODE_ENV=production)
npm run build:analyze    # Build with bundle analysis
npm run preview          # Preview production build

# Code Quality
npm run typecheck        # TypeScript type checking
npm run typecheck:watch  # Watch mode type checking
npm run lint             # Run ESLint (FAILS on warnings)
npm run lint:fix         # Auto-fix ESLint issues
npm run format           # Format all files with Prettier
npm run format:check     # Check formatting without changes
npm run validate         # Run ALL quality checks (type + lint + format)

# Testing
npm test                 # Run tests once
npm run test:watch       # Run tests in watch mode
npm run test:ui          # Run tests with UI
npm run test:coverage    # Generate coverage report

# Maintenance
npm run clean            # Clean build artifacts
npm run clean:cache      # Clear all caches
npm run clean:modules    # Remove node_modules
```

### Pre-Commit Workflow

**RULE 51**: Run validation before committing

```bash
# ✅ CORRECT - Full validation workflow

# 1. Format code
npm run format

# 2. Fix linting issues
npm run lint:fix

# 3. Type check
npm run typecheck

# 4. Run tests
npm test

# 5. Or run everything at once
npm run validate && npm test

# ❌ WRONG - Committing without checks
git commit -m "changes" # No validation!
```

### Node.js & Package Manager Requirements

**RULE 52**: Adhere to engine requirements (package.json)

```json
// Required versions:
- Node.js: >= 18.0.0 (specified in .nvmrc: 20.10.0)
- npm: >= 9.0.0
- pnpm: >= 8.0.0 (alternative)
- yarn: >= 1.22.0 (alternative)

// ✅ CORRECT - Use .nvmrc
nvm use                  # Switches to Node 20.10.0
node --version           # Should output v20.10.0

// Package manager (configured):
packageManager: "npm@10.0.0"

// Volta (if using):
volta install node@20.10.0
volta install npm@10.2.3
```

### Browser Support

**RULE 53**: Target specified browsers (package.json browserslist)

```javascript
// Production builds support:
- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

// Development builds:
- Last 1 version of Chrome/Firefox/Safari
- Maintained Node.js versions

// ✅ CORRECT - Use modern features confidently
const data = array?.map(item => item.value) ?? [];
await Promise.allSettled(promises);
const uniqueSet = new Set([...array]);

// ❌ WRONG - Don't polyfill for ancient browsers
// No need for IE11 polyfills
```

### Docker & CI/CD

**RULE 54**: Docker configuration alignment

```bash
# Docker services (docker-compose.yml):
- gridiron-dev: Development server (port 5173)
- gridiron-prod: Production build (port 3000)
- gridiron-test: Testing environment
- gridiron-analyze: Bundle analysis (port 4173)

# ✅ CORRECT - Use Docker for consistent environments
docker-compose up gridiron-dev     # Development
docker-compose up gridiron-prod    # Production
docker-compose up gridiron-test    # Run tests

# Multi-stage Dockerfile:
- base: Dependencies installation
- development: Dev server
- build: Production build
- production: Nginx serving static files
```

### Vite Build Configuration

**RULE 55A**: Understand Vite build settings (vite.config.ts)

```typescript
// Build output:
- outDir: 'dist/app'
- assetsDir: 'assets'
- sourcemap: true (production source maps enabled)
- minify: 'terser' (production minification)

// Code splitting:
- Manual chunks for vendor libraries
- Separate chunks for React, MUI, Router
- Lazy loading for routes

// Asset optimization:
- Images: Optimized during build
- Fonts: Inlined or copied based on size
- SVG: Can be imported as React components

// ✅ CORRECT - Import path aliases work in Vite
import { Component } from '@gridiron/app/components';
import { service } from '@gridiron/data/service';

// ✅ CORRECT - Import JSON directly
import packageJson from '../package.json';

// ✅ CORRECT - Import TypeScript files with extension
import { helper } from './utils/helper.ts';
```

**RULE 55B**: Environment variables (Vite)

```typescript
// Vite exposes env vars prefixed with VITE_
// Access via import.meta.env (NOT process.env)

// ✅ CORRECT - Vite env variables
const version = import.meta.env.VITE_APP_VERSION;
const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;
const mode = import.meta.env.MODE; // 'development' | 'production'

// ❌ WRONG - Node.js process.env (doesn't work in browser)
const version = process.env.VITE_APP_VERSION;

// Environment files loaded:
// .env (all cases)
// .env.local (all cases, ignored by git)
// .env.[mode] (specific mode)
// .env.[mode].local (specific mode, ignored by git)
```

### PWA & Offline Support

**RULE 55C**: Progressive Web App requirements

```typescript
// PWA features (configured):
- Service Worker: public/sw.js
- Manifest: public/manifest.json
- Offline fallback: public/offline.html
- Workbox integration: workbox-window

// ✅ CORRECT - Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered:', registration);
      })
      .catch(error => {
        console.log('SW registration failed:', error);
      });
  });
}

// Manifest configuration:
- Theme color: #1a1a1a (dark), #ffffff (light)
- Color scheme: dark light
- Viewport fit: cover (for notched devices)
```

## Quick Reference Checklist

### Before Committing Code

**Code Quality**:

- [ ] All files have module-level JSDoc
- [ ] All exported functions documented
- [ ] Import ordering follows rules (no ESLint errors)
- [ ] Type imports use `import type`
- [ ] No floating promises (`await` or `void`)
- [ ] Context values are memoized
- [ ] No direct state mutations
- [ ] Proper error handling and logging
- [ ] Tests written for new functionality
- [ ] No console.log (use logger instead)
- [ ] Component < 300 lines

**Formatting & Linting** (run scripts):

- [ ] `npm run format` - Prettier formatting applied
- [ ] `npm run lint:fix` - ESLint issues fixed
- [ ] `npm run typecheck` - TypeScript compiles with no errors
- [ ] `npm test` - All tests pass
- [ ] `npm run validate` - Full validation passes

**Configuration Compliance**:

- [ ] EditorConfig settings respected (2 spaces, LF, UTF-8)
- [ ] Line length ≤ 100 characters (TypeScript/JavaScript)
- [ ] Single quotes for strings (except JSX)
- [ ] Semicolons always present
- [ ] Trailing commas (ES5 style)
- [ ] Final newline in all files
- [ ] No trailing whitespace

**TypeScript Strict Mode**:

- [ ] Array access handles `undefined` (noUncheckedIndexedAccess)
- [ ] Catch errors typed as `unknown` (useUnknownInCatchVariables)
- [ ] No unused locals or parameters
- [ ] All code paths return value (noImplicitReturns)
- [ ] Optional properties exact (exactOptionalPropertyTypes)

**Testing Coverage**:

- [ ] Global coverage: ≥70% branches, ≥70% functions, ≥75% lines
- [ ] Data layer: ≥80% branches, ≥80% functions, ≥85% lines
- [ ] Engine layer: ≥85% branches, ≥85% functions, ≥90% lines
- [ ] Critical paths have comprehensive tests

### Creating New Service

- [ ] Create `types.ts` FIRST
- [ ] One function per file
- [ ] Client as first parameter
- [ ] Comprehensive JSDoc
- [ ] Create `index.ts` LAST
- [ ] Update consumers before deleting old files
- [ ] Run tests

### Creating New Component

- [ ] Props interface defined
- [ ] Hooks at top of component
- [ ] Event handlers named (not inline for complex logic)
- [ ] Loading/error states handled
- [ ] Proper TypeScript types
- [ ] JSDoc documentation

---

## Project Metadata & Attribution

### License & Copyright

**RULE 56**: Project uses MIT License

```typescript
// All original code is:
// Copyright (c) 2024 Victor Williams
// Licensed under MIT License

// When contributing:
- Your code will be under MIT License
- Ensure no proprietary/copyrighted code is included
- Third-party code must be compatible with MIT
- Document any external code sources
```

### Author Information

**RULE 57**: Project metadata (package.json)

```json
// Project information:
- Name: gridiron-tactics
- Version: 0.2.0 (semantic versioning)
- License: MIT
- Private: true (not published to npm)
- Author: Victor Williams (victor.williams.dev@gmail.com)
- Repository: https://github.com/Vaporjawn/Gridiron-Tactics
```

### Documentation Standards

**RULE 58**: Maintain key documentation files

```markdown
// Required documentation files:

- README.md: Project overview, setup, features
- CHANGELOG.md: Version history and changes
- CONTRIBUTING.md: Contribution guidelines
- LICENSE: MIT License full text
- docs/: Comprehensive documentation

// ✅ CORRECT - Update CHANGELOG for significant changes

## [Unreleased]

### Added

- New feature description

### Changed

- Modified behavior description

### Fixed

- Bug fix description
```

## Conclusion

These guidelines are designed to:

- ✅ Prevent the need for large refactorings
- ✅ Maintain consistency across the codebase
- ✅ Ensure type safety and code quality
- ✅ Improve maintainability and readability
- ✅ Support team collaboration
- ✅ Align with all project configuration files

**Configuration Files Referenced**:

- `.editorconfig` - Editor formatting settings
- `.prettierrc` - Code formatting rules
- `.eslintrc.cjs` - Linting rules and standards
- `tsconfig.json` - TypeScript compiler settings
- `vitest.config.ts` - Testing configuration
- `vite.config.ts` - Build and development settings
- `package.json` - Scripts, dependencies, metadata
- `docker-compose.yml` - Container orchestration
- `.nvmrc` - Node.js version requirement

**When in doubt**:

1. Look at recently refactored code (statsService, leagueService) as reference
2. Run `npm run validate` to check compliance
3. Check relevant configuration file for specific rules
4. Consult this guide for patterns and explanations

**Questions**: If patterns aren't clear, consult this guide and existing modular
services.

**Validation Workflow**:

```bash
# Always run before committing:
npm run format      # Auto-format with Prettier
npm run lint:fix    # Fix auto-fixable lint issues
npm run typecheck   # Verify TypeScript compilation
npm test            # Run test suite
npm run validate    # Full validation (all of the above)
```
