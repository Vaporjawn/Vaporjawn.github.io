# Project Star Modification Feature - Development Mode Only

## Overview
This feature restricts project star/featured status modifications to development mode only. In production, users can view starred projects but cannot modify the star status.

## Implementation Details

### Location
- **Hook**: `src/hooks/useStarredProjects.ts`
- **Environment Check**: Uses `import.meta.env.MODE === "development"`

### How It Works

1. **Development Mode** (`import.meta.env.MODE === "development"`):
   - Users can toggle star status on projects
   - Changes are saved to localStorage under the key `"featured-status-overrides"`
   - Console logs normal operation

2. **Production Mode** (any other mode):
   - `toggleStar()` function exits early with console warning
   - No modifications are made to localStorage
   - Users can still view existing starred projects
   - Console warning: "Project star modifications are only allowed in development mode"

### API Methods

The `useStarredProjects` hook provides:

```typescript
{
  toggleStar: (projectId: string, originalFeatured: boolean) => void;
  isStarred: (projectId: string, originalFeatured: boolean) => boolean;
  getFeaturedStatus: (projectId: string, originalFeatured: boolean) => boolean;
  canModifyStars: () => boolean;
}
```

- `toggleStar`: Toggles star status (only works in development)
- `isStarred`: Checks if project is starred (works in all environments)
- `getFeaturedStatus`: Alias for isStarred
- `canModifyStars`: Returns true if modifications are allowed (development mode only)

### Testing the Feature

#### Manual Testing in Browser

1. **Development Mode Test**:
   ```bash
   npm start  # Runs in development mode
   ```
   - Open browser console
   - Navigate to a page with projects
   - Try to star/unstar projects - should work
   - Check `localStorage.getItem("featured-status-overrides")` - should show changes

2. **Production Mode Test**:
   ```bash
   npm run build && npm run preview  # Runs in production mode
   ```
   - Open browser console
   - Try to star/unstar projects - should show warning and not work
   - Check localStorage - should remain unchanged

#### Expected Console Output

**Development Mode**:
```
No warnings when toggling stars
localStorage updates visible
```

**Production Mode**:
```
Console Warning: "Project star modifications are only allowed in development mode"
No localStorage changes
```

## Environment Detection

The feature uses Vite's built-in environment detection:
- `import.meta.env.MODE` returns `"development"` during development
- `import.meta.env.MODE` returns `"production"` during production build
- Any other mode (test, staging, etc.) is treated as non-development

## Storage Format

LocalStorage key: `"featured-status-overrides"`
Format:
```json
{
  "project-id-1": true,
  "project-id-2": false
}
```

- `true`: Project is starred (overriding original featured: false)
- `false`: Project is not starred (overriding original featured: true)
- Missing key: Use original featured status

## Integration with Existing Code

This feature integrates seamlessly with existing project display logic:
- Projects use `isStarred(projectId, originalFeatured)` to determine display state
- Original featured status from project data is preserved
- Overrides only apply when user has explicitly toggled star status
- Removing overrides (toggling back to original state) cleans up localStorage

## Security Considerations

- This is a UI/UX feature only - no sensitive data is protected
- Production restriction prevents accidental modifications by end users
- LocalStorage is client-side only - no server-side implications
- Feature gracefully degrades if localStorage is unavailable

## Future Enhancements

Potential improvements:
- Add admin mode toggle for production star modifications
- Implement server-side star storage for persistence across devices
- Add user authentication-based star management
- Export/import starred project lists