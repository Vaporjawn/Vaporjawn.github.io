## GitHub Contributions Heatmap – Enhancement Roadmap

This file tracks optional, non-blocking improvements for the contributions visualization. Prioritize based on value vs. complexity.

| # | Feature | Value | Effort | Notes / Approach |
|---|---------|-------|--------|------------------|
| 1 | Streak & longest streak summary | Medium | Low | Post-process `contributionDays` flattened array; compute consecutive >0 sequences. Cache in JSON? keep client-side for now. |
| 2 | Month labels across top | High | Low | Insert <text> elements above first row at week boundaries where month changes. Use `Intl.DateTimeFormat('en',{month:'short'})`. |
| 3 | Accessible focus navigation | High | Medium | Make rects focusable via `tabIndex=0`; arrow-key grid movement (roving tabindex) for keyboard exploration. |
| 4 | Tooltip / Popover (hover & focus) | High | Medium | Lightweight portal or `title` replacement: custom <foreignObject> or absolutely positioned div; announce via aria-live. |
| 5 | Themed gradient mapping | Medium | Low | Map GitHub green hexes → theme palette tonal steps (`theme.palette.primary.light` → `main` → `dark`). Provide override prop. |
| 6 | Stale data badge ( >36h ) | Medium | Low | Compare `new Date(json.generatedAt)` to now; fallback to file mtime (expose via script). Show small ⚠ icon with tooltip. |
| 7 | Quantized adaptive legend | Low | Medium | Compute natural breaks (Jenks) or quantiles for dynamic bucket boundaries; show counts range per swatch. |
| 8 | ETag / Conditional fetch | Low | Medium | Add HEAD request (Action can print ETag hash into file name or commit SHA). Might be overkill for small JSON. |
| 9 | Print-friendly mode | Low | Low | Provide high-contrast grayscale styling when `@media print`. |
|10 | Timezone awareness badge | Low | Low | Display timezone used (UTC) if user locale differs. |

### Implementation Order Recommendation
1. Month labels (2)
2. Tooltip + keyboard nav (3 & 4 combined in iteration)
3. Streak summary (1)
4. Stale data badge (6)
5. Themed gradient (5)

### Data Contract Extension (Proposed)
Add optional fields the script could append to JSON (non-breaking addition):
```jsonc
{
  "generatedAt": "2025-09-19T03:17:22.381Z",
  "totalContributions": 1234,
  "streak": { "current": 12, "longest": 47 },
  "weeks": [ ... ]
}
```
Client should feature-detect (`if('streak' in data)`).

### Testing Considerations
| Feature | Test Focus |
|---------|------------|
| Month labels | Correct label at first day of each month; no duplicates mid-month |
| Streaks | Edge cases: zero-contribution days at boundaries; leap year coverage |
| Keyboard navigation | Arrow keys wrap vertically but not horizontally beyond bounds |
| Tooltip | Accessible name announced once; no duplicate aria-live spam |
| Stale badge | Appears only when threshold exceeded |

### Performance Notes
Even full year (≈ 371 max days fetched) × minimal SVG rects is trivial; enhancements focus on accessibility & UX, not raw performance.

---
Last Updated: (add date on edit)