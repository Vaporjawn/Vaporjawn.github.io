# Service Refactoring Guidelines

This document outlines the standardized approach for refactoring class-based
services into modular, function-based architecture.

## Table of Contents

- [Overview](#overview)
- [Directory Structure](#directory-structure)
- [File Creation Rules](#file-creation-rules)
- [Code Transformation Patterns](#code-transformation-patterns)
- [Import Statement Rules](#import-statement-rules)
- [Documentation Standards](#documentation-standards)
- [Cleanup Process](#cleanup-process)
- [Verification Steps](#verification-steps)
- [Examples](#examples)

---

## Overview

### Goals

- **Modularity**: Each function in its own file for better organization and
  maintainability
- **Type Safety**: Centralized type definitions with proper TypeScript usage
- **Documentation**: Comprehensive JSDoc comments for all functions
- **Testability**: Pure functions are easier to test than class methods
- **Tree Shaking**: Better support for dead code elimination in bundlers

### When to Refactor

- Service classes exceed 300 lines
- Multiple unrelated responsibilities in single class
- Difficult to test due to tight coupling
- Poor separation of concerns

---

## Directory Structure

### Standard Layout

```
/src/data/serviceName/
├── types.ts              # All interfaces, types, and type-only exports
├── constants.ts          # Constants (if needed)
├── utils.ts              # Shared utility functions (if needed)
├── functionName.ts       # Each public/private method as pure function
├── anotherFunction.ts    # More function files...
└── index.ts              # Centralized exports (ALWAYS LAST)
```

### File Naming Conventions

- **types.ts**: Always named `types.ts`
- **constants.ts**: Always named `constants.ts` (only if needed)
- **Function files**: Use camelCase matching the function name (e.g.,
  `getUserById.ts`)
- **index.ts**: Always named `index.ts`, created LAST

---

## File Creation Rules

### 1. types.ts (ALWAYS FIRST)

**Purpose**: Define all TypeScript interfaces, types, and constants used across
the service

**Structure**:

```typescript
/**
 * Type definitions for ServiceName
 * @module data/serviceName/types
 */

// Export all interfaces
export interface MainInterface {
  id: string;
  name: string;
  // ... fields
}

export interface HelperInterface {
  // ... fields
}

// Export type aliases
export type StatusType = 'active' | 'inactive' | 'pending';

// Export constants that are used as types/values
export const CONSTANT_MAP: Record<string, string> = {
  key1: 'value1',
  key2: 'value2',
};
```

**Rules**:

- Create this file FIRST before any function files
- Include comprehensive JSDoc for each interface
- Export ALL types that other files will need
- Include both runtime constants (like maps) and type-only definitions
- Group related types together with comments

### 2. constants.ts (IF NEEDED)

**Purpose**: Define constants used across multiple functions

**Structure**:

```typescript
/**
 * Constants for ServiceName
 * @module data/serviceName/constants
 */

export const STORAGE_KEY = 'app_storage_key';
export const DEFAULT_TIMEOUT = 5000;
export const API_VERSION = 'v1';
```

**When to Create**:

- Multiple functions reference the same constant values
- Constants are configuration-level (not type definitions)
- Skip this file if no shared constants exist

### 3. utils.ts (IF NEEDED)

**Purpose**: Shared utility functions used by multiple service functions

**Structure**:

```typescript
/**
 * Utility functions for ServiceName
 * @module data/serviceName/utils
 */

/**
 * Format a value for display
 * @param value - Raw value to format
 * @returns Formatted string
 */
export function formatValue(value: number): string {
  return value.toFixed(2);
}
```

**When to Create**:

- Multiple functions share common logic
- Logic is pure and reusable
- Skip if no shared utilities exist

### 4. Function Files

**Purpose**: Each class method becomes a standalone pure function

**Naming**: Match the original method name (e.g., `getUserById` →
`getUserById.ts`)

**Structure Template**:

```typescript
/**
 * Brief description of what this function does
 * @module data/serviceName/functionName
 */

import type { DataClient } from '../client';
import type { ReturnType, ParamType } from './types';

import { helperFunction } from './helperFunction';
import { CONSTANT } from './constants';

/**
 * Detailed description of the function's purpose and behavior
 *
 * @param client - DataClient instance for database operations
 * @param paramName - Description of this parameter
 * @param optionalParam - Description of optional parameter
 * @returns Description of what is returned
 * @throws {Error} Description of when errors are thrown
 *
 * @example
 * const result = await functionName(client, 'value', 123);
 * console.log(result); // Expected output
 */
export async function functionName(
  client: DataClient,
  paramName: string,
  optionalParam?: number
): Promise<ReturnType> {
  // Implementation
}
```

**Rules**:

- ONE function per file
- First parameter MUST be dependencies (e.g., `client: DataClient`)
- Remove ALL `this` references - convert to parameters
- Use descriptive parameter names
- Include comprehensive JSDoc with @param, @returns, @throws, @example

### 5. index.ts (ALWAYS LAST)

**Purpose**: Centralized export point for the entire service

**Structure**:

```typescript
/**
 * ServiceName
 * Brief description of what this service does
 * @module data/serviceName
 */

// Export types (type-only imports)
export type { MainInterface, HelperInterface, StatusType } from './types';

// Export constants (value imports)
export { CONSTANT_MAP } from './types';
export { STORAGE_KEY, DEFAULT_TIMEOUT } from './constants';

// Export utility functions
export { formatValue } from './utils';

// Export all service functions (alphabetically ordered)
export { functionOne } from './functionOne';
export { functionTwo } from './functionTwo';
export { functionThree } from './functionThree';
```

**Rules**:

- Create this file LAST after all other files
- Separate type exports from value exports
- Use `export type { }` for type-only exports
- Use `export { }` for value exports
- Alphabetize function exports for maintainability
- Include module-level JSDoc

---

## Code Transformation Patterns

### Pattern 1: Class Method → Pure Function

**BEFORE** (Class Method):

```typescript
export class UserService {
  constructor(private client: DataClient) {}

  async getUserById(id: string): Promise<User | null> {
    const rows = await this.client.query<User>(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    return rows.length > 0 ? rows[0] : null;
  }
}
```

**AFTER** (Pure Function):

```typescript
/**
 * Retrieve a user by their unique identifier
 * @module data/userService/getUserById
 */

import type { DataClient } from '../client';
import type { User } from './types';

/**
 * Retrieves a user from the database by ID
 *
 * @param client - DataClient instance for database operations
 * @param id - Unique user identifier
 * @returns User object if found, null otherwise
 *
 * @example
 * const user = await getUserById(client, 'user-123');
 * if (user) {
 *   console.log(user.name);
 * }
 */
export async function getUserById(
  client: DataClient,
  id: string
): Promise<User | null> {
  const rows = await client.query<User>('SELECT * FROM users WHERE id = ?', [
    id,
  ]);
  return rows.length > 0 ? rows[0] : null;
}
```

**Transformation Steps**:

1. Remove `async` before method name, add to `export async function`
2. Change `this.client` → `client` (first parameter)
3. Remove `private`/`public` keywords
4. Add comprehensive JSDoc
5. Import all required types
6. Ensure proper error handling

### Pattern 2: Private Method → Internal Function

**BEFORE** (Private Method):

```typescript
private calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

**AFTER** (Internal Function):

```typescript
/**
 * Calculate the total price of items
 * @module data/serviceName/calculateTotal
 */

import type { Item } from './types';

/**
 * Sums the prices of all items
 *
 * @param items - Array of items to sum
 * @returns Total price
 *
 * @example
 * const total = calculateTotal([
 *   { price: 10 },
 *   { price: 20 }
 * ]);
 * console.log(total); // 30
 */
export function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

**Key Changes**:

- Private methods become exported functions (they're "private" by not being in
  index.ts)
- Still export them so other service functions can import
- Document thoroughly even if "internal"

### Pattern 3: Method Calling Another Method

**BEFORE**:

```typescript
async processUser(id: string): Promise<void> {
  const user = await this.getUserById(id);
  const total = this.calculateTotal(user.items);
  await this.saveTotal(user.id, total);
}
```

**AFTER**:

```typescript
import type { DataClient } from '../client';

import { getUserById } from './getUserById';
import { calculateTotal } from './calculateTotal';
import { saveTotal } from './saveTotal';

/**
 * Process a user by calculating and saving their total
 *
 * @param client - DataClient instance
 * @param id - User identifier
 */
export async function processUser(
  client: DataClient,
  id: string
): Promise<void> {
  const user = await getUserById(client, id);
  if (!user) {
    throw new Error(`User ${id} not found`);
  }
  const total = calculateTotal(user.items);
  await saveTotal(client, user.id, total);
}
```

**Key Changes**:

- Import each function explicitly
- Pass `client` to each async function
- Add null checks where methods assumed data exists

### Pattern 4: Synchronous localStorage Operations

**BEFORE**:

```typescript
private getRegistry(): Entry[] {
  try {
    const stored = localStorage.getItem(REGISTRY_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to read registry:', error);
    return [];
  }
}
```

**AFTER**:

```typescript
import { REGISTRY_KEY } from './constants';
import type { Entry } from './types';

/**
 * Retrieve the registry from localStorage
 *
 * @returns Array of registry entries, empty array if not found or on error
 *
 * @example
 * const entries = getRegistry();
 * console.log(entries.length);
 */
export function getRegistry(): Entry[] {
  try {
    const stored = localStorage.getItem(REGISTRY_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error('[ServiceName] Failed to read registry:', error);
    return [];
  }
}
```

**Key Changes**:

- No `client` parameter needed (localStorage is synchronous)
- Import constants from separate file
- Keep error handling patterns
- Add service name to console logs

---

## Import Statement Rules

### Critical Import Ordering Pattern

**CORRECT ORDER** (enforced by ESLint):

```typescript
// 1. External type imports
import type { ExternalType } from 'external-package';

// 2. Blank line

// 3. Local type imports from parent directories
import type { DataClient } from '../client';
import type { SharedType } from '../../shared/types';

// 4. Blank line (ONLY if local value imports follow)

// 5. Local value imports (functions, constants, etc.)
import { helperFunction } from './helperFunction';
import { CONSTANT } from './constants';

// 6. Local type imports from same directory
import type { LocalType } from './types';
```

### Common Import Patterns

**Pattern 1: Type-only imports**

```typescript
import type { User, Team } from './types';
import type { DataClient } from '../client';
```

**Pattern 2: Value imports (functions, constants)**

```typescript
import { getUserById } from './getUserById';
import { STORAGE_KEY } from './constants';
```

**Pattern 3: Mixed imports (DON'T DO THIS)**

```typescript
// ❌ WRONG - Don't mix type and value imports
import { User, getUserById } from './file';

// ✅ CORRECT - Separate type and value imports
import type { User } from './types';
import { getUserById } from './getUserById';
```

**Pattern 4: Importing runtime constants from types.ts**

```typescript
// In types.ts
export const STAT_COLUMN_MAP: Record<string, string> = {
  /* ... */
};

// In function file - value import, NOT type import
import { STAT_COLUMN_MAP } from './types'; // ✅ CORRECT
// NOT: import type { STAT_COLUMN_MAP } from './types'; // ❌ WRONG
```

### Blank Line Rules

1. **Between type imports and value imports**: REQUIRED
2. **Within type import group**: NOT ALLOWED
3. **Within value import group**: NOT ALLOWED
4. **Between import sections and code**: REQUIRED

**Example**:

```typescript
// Type imports (no blank lines within)
import type { User } from './types';
import type { DataClient } from '../client';

// Blank line separator
import { getUser } from './getUser';
import { CONSTANT } from './constants';

// Blank line before code
export async function myFunction() {
  // ...
}
```

---

## Documentation Standards

### JSDoc Template

**Module-level** (at top of file):

```typescript
/**
 * Brief description of what this module does
 * @module data/serviceName/fileName
 */
```

**Function-level**:

```typescript
/**
 * Brief one-line description
 *
 * Detailed description with multiple lines if needed.
 * Explain the purpose, behavior, and any important details.
 *
 * @param client - DataClient instance for database operations
 * @param paramName - Description of what this parameter does
 * @param optionalParam - Description of optional parameter (optional)
 * @returns Description of the return value and its structure
 * @throws {Error} Description of when errors are thrown
 *
 * @example
 * // Show realistic usage example
 * const result = await functionName(client, 'value', 123);
 * if (result) {
 *   console.log(result.data);
 * }
 *
 * @example
 * // Show edge case or alternative usage
 * const result = await functionName(client, 'value');
 * // optionalParam defaults to 0
 */
```

### Documentation Requirements

**MUST HAVE**:

- Module-level JSDoc at top of every file
- Function-level JSDoc for every exported function
- @param for EVERY parameter (including `client`)
- @returns describing what is returned
- At least ONE @example showing realistic usage

**SHOULD HAVE**:

- @throws for functions that throw errors
- Multiple @example blocks for complex functions
- Detailed descriptions for non-obvious behavior

**NICE TO HAVE**:

- @see references to related functions
- @deprecated tags for legacy functions
- Performance considerations in description

---

## Cleanup Process

**⚠️ CRITICAL**: This cleanup phase is MANDATORY and must not be skipped.
Leaving old class files after refactoring creates maintenance issues, confusion,
and potential bugs.

### Step 1: Update All Consumer Files FIRST

**BEFORE deleting original class file**, update all files that import it:

```bash
# Find all files importing the old class
grep -r "import.*ServiceName.*from.*serviceName" src/
grep -r "new ServiceName" src/

# For each file found:
# 1. Update imports to use functional exports
# 2. Replace class instantiation with direct function calls
# 3. Pass client as first parameter to all functions
```

**Example Consumer Update**:

```typescript
// BEFORE
import { UserService } from '../data/userService';
const service = new UserService(client);
const user = await service.getUserById('123');

// AFTER
import { getUserById } from '../data/userService';
const user = await getUserById(client, '123');
```

### Step 2: Update Tests

```bash
# Find test files using the old class
find src -name "*.test.ts" -o -name "*.spec.ts" | xargs grep -l "ServiceName"

# Update each test file to use functional API
```

**Example Test Update**:

```typescript
// BEFORE
const service = new UserService(client);
const result = await service.getUserById('123');

// AFTER
const result = await getUserById(client, '123');
```

### Step 3: Verify Compilation BEFORE Deletion

```bash
# Run TypeScript compilation
npm run typecheck

# Should see no errors from the refactored service
# Fix any remaining import issues before proceeding
```

### Step 4: Delete Original Class File

**⚠️ ONLY after Step 1, 2, and 3 are complete:**

```bash
# Delete the obsolete class file
rm src/data/serviceName.ts

# Verify file is deleted
ls src/data/serviceName.ts  # Should show "No such file or directory"
```

### Step 5: Remove from Main Index (if applicable)

Check if the old class is exported from `/src/data/index.ts`:

```bash
# Check main index exports
grep "ServiceName" src/data/index.ts

# If found, remove the old class export line
# Keep any new modular exports that were added
```

**Example Index Update**:

```typescript
// BEFORE
export { UserService } from './userService.js'; // ❌ REMOVE THIS

// AFTER - Should have modular exports instead
export { getUserById, createUser, updateUser } from './userService';
export type { User, UserOptions } from './userService';
```

### Step 6: Final Verification

```bash
# Full TypeScript compilation check
npm run typecheck

# Should pass with no errors

# Run build to verify bundle works
npm run build

# Should complete successfully

# Run tests
npm run test

# All tests should pass

# Manual browser testing
npm run dev
# Navigate to features using the refactored service
```

### Step 7: Search for Stragglers

```bash
# Double-check no references to old class remain
grep -r "new ServiceName" src/
grep -r "from.*\/serviceName\.js" src/

# Should return no results (or only doc references)
```

### Cleanup Checklist

Use this checklist for EVERY refactoring:

- [ ] **All consumer files updated** to use functional imports
- [ ] **All tests updated** to use functional API
- [ ] **TypeScript compilation passes** before deletion
- [ ] **Original class file deleted** (`rm src/data/serviceName.ts`)
- [ ] **Old class export removed** from main index.ts (if present)
- [ ] **TypeScript compilation passes** after deletion
- [ ] **Build succeeds** (`npm run build`)
- [ ] **Tests pass** (`npm run test`)
- [ ] **Manual browser testing** confirms functionality
- [ ] **No straggler references** found in codebase

### Common Cleanup Mistakes to Avoid

#### ❌ Mistake 1: Deleting Before Updating Consumers

```bash
# WRONG - Deletes file before updating imports
rm src/data/userService.ts
npm run typecheck  # ERROR: Cannot find module

# CORRECT - Update all consumers first, then delete
# 1. Update all imports
# 2. Run typecheck
# 3. Then delete old file
```

#### ❌ Mistake 2: Forgetting to Delete Old File

```bash
# WRONG - Both old and new exist
src/data/userService.ts          # Old class file ❌
src/data/userService/index.ts    # New modular ✅

# CORRECT - Only new structure exists
src/data/userService/index.ts    # New modular ✅
```

#### ❌ Mistake 3: Not Removing from Main Index

```typescript
// WRONG - Old export still in index.ts
export { UserService } from './userService.js'; // File doesn't exist!

// CORRECT - Only new exports in index.ts
export { getUserById, createUser } from './userService';
```

#### ❌ Mistake 4: Skipping Test Updates

```bash
# WRONG - Tests still use old class
npm run test  # ERROR: Cannot find module 'userService'

# CORRECT - Update tests to functional API
# Then all tests pass
```

### When Cleanup Goes Wrong

If you accidentally delete files before updating consumers:

1. **Restore from git**:

   ```bash
   git checkout src/data/serviceName.ts
   ```

2. **Follow cleanup steps in order**

3. **Don't skip Step 1 again**

### Documentation Updates (Optional but Recommended)

After cleanup, update any README or documentation files that reference the old
class:

```bash
# Find docs mentioning old class
grep -r "new ServiceName" docs/

# Update examples to show functional usage
# This is lower priority than code cleanup
```

---

## Verification Steps

### Pre-Refactoring Checklist

- [ ] Original service file identified
- [ ] All methods documented (note public vs private)
- [ ] All dependencies identified (what does service use?)
- [ ] All consumers identified (what uses this service?)

### During-Refactoring Checklist

- [ ] types.ts created FIRST with all interfaces
- [ ] constants.ts created if needed
- [ ] Function files created one at a time
- [ ] Each function has comprehensive JSDoc
- [ ] Import ordering follows rules (no ESLint errors)
- [ ] All `this.` references converted to parameters
- [ ] index.ts created LAST with all exports

### Post-Refactoring Checklist

- [ ] No ESLint errors in any new files
- [ ] `npm run typecheck` passes with new code
- [ ] **All consumer files updated to functional imports**
- [ ] **All tests updated to functional API**
- [ ] **Original class file deleted** (`src/data/serviceName.ts`)
- [ ] **Old class export removed from main index.ts**
- [ ] `npm run typecheck` passes after deletion
- [ ] `npm run build` succeeds
- [ ] `npm run test` passes (if tests exist)
- [ ] Manual browser testing passes
- [ ] **No straggler references to old class** (`grep -r "new ServiceName"`
      returns nothing)

---

## Examples

### Example 1: Simple Service (statsService)

**Original Structure** (1 file, 323 lines):

```
src/data/statsService.ts (class with 4 methods)
```

**Refactored Structure** (6 files):

```
src/data/statsService/
├── types.ts (interfaces + STAT_COLUMN_MAP constant)
├── getPlayerCareerStats.ts
├── getPlayerSeasonStats.ts
├── getLeagueLeaders.ts
├── getPlayerGameLog.ts
└── index.ts
```

**Key Learnings**:

- STAT_COLUMN_MAP is a runtime value, NOT a type-only import
- Database queries return arrays, need `.length > 0 ? results[0] : null`
- Each function needs `client: DataClient` as first parameter

### Example 2: Complex Service (leagueService)

**Original Structure** (1 file, 348 lines):

```
src/data/leagueService.ts (class with 13 methods: 5 private, 8 public)
```

**Refactored Structure** (17 files):

```
src/data/leagueService/
├── types.ts (4 interfaces)
├── constants.ts (LEAGUE_REGISTRY_KEY)
├── getLeagueRegistry.ts (private → internal)
├── saveLeagueRegistry.ts (private → internal)
├── addToRegistry.ts (private → internal)
├── updateRegistryTeamInfo.ts (private → internal)
├── removeFromRegistry.ts (private → internal)
├── listLeagues.ts
├── isLeagueNameTaken.ts
├── generateUniqueName.ts
├── getLeagueInfoByDbName.ts
├── getLeagueInfo.ts
├── createLeague.ts
├── listTeams.ts
├── deleteLeague.ts
├── updateLastPlayed.ts
└── index.ts
```

**Key Learnings**:

- Private methods still get their own files (they're internal, not in index.ts)
- localStorage operations don't need `client` parameter
- Mixed sync (localStorage) and async (database) operations
- Some functions need external dependencies (DatabaseSeeder, NFL_TEAMS)

### Example 3: Large Service (simService - in progress)

**Original Structure** (1 file, 1,526 lines):

```
src/data/simService.ts (class with ~35 methods)
```

**Refactored Structure** (~35+ files):

```
src/data/simService/
├── types.ts (all interfaces)
├── utils.ts (hashSeed, generateUUID)
├── getCurrentSeasonState.ts
├── getCurrentWeekGames.ts
├── getTeam.ts
├── getTeamRoster.ts
├── mapPlayerRow.ts
├── getPlayerDatabaseRow.ts
├── saveGameResult.ts
├── updateTeamRecord.ts
├── ... (~26 more function files)
└── index.ts
```

**Key Learnings**:

- Very large services benefit most from modularization
- Break into logical groups: queries, persistence, phase management, etc.
- Some functions are 200+ lines (advanceWeek) - still one file
- Complex dependencies require careful ordering

---

## Common Mistakes to Avoid

### ❌ Mistake 1: Wrong Import Type

```typescript
// WRONG - Importing value as type
import type { STAT_COLUMN_MAP } from './types';
const value = STAT_COLUMN_MAP['key']; // Runtime error!

// CORRECT - Import runtime values as values
import { STAT_COLUMN_MAP } from './types';
const value = STAT_COLUMN_MAP['key']; // Works!
```

### ❌ Mistake 2: Blank Lines in Import Groups

```typescript
// WRONG - Blank line within type imports
import type { User } from './types';

import type { DataClient } from '../client';

// CORRECT - No blank lines within groups
import type { User } from './types';
import type { DataClient } from '../client';
```

### ❌ Mistake 3: Creating index.ts Too Early

```typescript
// WRONG - Creating index.ts before all functions
// Results in missing exports and constant reimports

// CORRECT - Create index.ts LAST after all function files exist
```

### ❌ Mistake 4: Forgetting to Delete Original File

```typescript
// WRONG - Both old and new exist
src/data/statsService.ts (old class)
src/data/statsService/index.ts (new modular)

// CORRECT - Only new structure exists
src/data/statsService/index.ts (new modular only)
```

### ❌ Mistake 5: Not Updating Consumer Files

```typescript
// WRONG - Old import still references deleted class
import { StatsService } from '../data/statsService';

// CORRECT - Update to use new functional exports
import {
  getPlayerCareerStats,
  getPlayerSeasonStats,
} from '../data/statsService';
```

---

## Quick Reference

### File Creation Order

1. types.ts (FIRST)
2. constants.ts (if needed)
3. utils.ts (if needed)
4. Function files (in any order)
5. index.ts (LAST)

### Import Order

1. External type imports
2. BLANK LINE
3. Local type imports
4. BLANK LINE (only if value imports follow)
5. Local value imports

### Required Documentation

- Module JSDoc (every file)
- Function JSDoc (every export)
- @param (every parameter)
- @returns (every function)
- @example (at least one)

### Cleanup Steps

1. Verify all files created
2. Run `npm run typecheck`
3. Delete original class file
4. Update consumers
5. Test in browser

---

## Conclusion

Following these guidelines ensures:

- ✅ Consistent code organization across all services
- ✅ Proper TypeScript typing and ESLint compliance
- ✅ Comprehensive documentation for maintainability
- ✅ Easier testing with pure functions
- ✅ Better tree-shaking and bundle optimization
- ✅ Clear refactoring process for future services

When in doubt, refer to completed examples (statsService, leagueService) as
templates for new refactorings.
