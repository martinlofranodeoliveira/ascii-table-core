# Contract — ascii-table-core

Pure ESM in `src/table.mjs`, zero runtime dependencies, Node >= 22.
Widths count code points (no East-Asian wide-char compensation).

| Export | Result |
| --- | --- |
| `MAX_ROWS` (10000) · `MAX_COLS` (20) · `MAX_CELL` (200 chars) | Hard bounds. |
| `parseRows(table)` | Validated string rows. Throws `EMPTY`/`BAD_SHAPE`/`TOO_MANY_ROWS`/`TOO_MANY_COLS`/`RAGGED`/`BAD_CELL`/`MULTILINE`/`CELL_TOO_BIG`. |
| `render(table, { align })` | Bordered text with header separator. align per column or single; default left, numeric columns right. |

Errors: as above plus `BAD_ALIGN`.
