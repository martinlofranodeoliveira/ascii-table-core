// SPDX-License-Identifier: MIT
// ASCII table renderer: rows of cells -> bordered text with a header
// separator and per-column alignment. Code-point widths (no wide-char
// compensation). No network, no I/O.

export const MAX_ROWS = 10000;
export const MAX_COLS = 20;
export const MAX_CELL = 200;

export class TableError extends Error {
  constructor(code, detail = '') {
    super(detail ? `${code}: ${detail}` : code);
    this.name = 'TableError';
    this.code = code;
  }
}

const width = (s) => [...s].length;

/** Validate rectangular rows of stringifiable cells. Returns string rows. */
export function parseRows(table) {
  if (!Array.isArray(table) || table.length === 0) throw new TableError('EMPTY');
  if (table.length > MAX_ROWS) throw new TableError('TOO_MANY_ROWS');
  const cols = table[0].length;
  if (!Array.isArray(table[0]) || cols === 0) throw new TableError('BAD_SHAPE');
  if (cols > MAX_COLS) throw new TableError('TOO_MANY_COLS');
  return table.map((row, i) => {
    if (!Array.isArray(row) || row.length !== cols) throw new TableError('RAGGED', `row ${i}`);
    return row.map((c) => {
      if (c === null || c === undefined) throw new TableError('BAD_CELL');
      const s = String(c);
      if ([...s].some((ch) => ch === '\n' || ch === '\r')) throw new TableError('MULTILINE');
      if ([...s].length > MAX_CELL) throw new TableError('CELL_TOO_BIG');
      return s;
    });
  });
}

/**
 * Render bordered text. First row is the header (separator under it).
 * align: 'left'|'right'|'center' or per-column array (default 'left',
 * numbers default 'right' when align is omitted entirely).
 */
export function render(table, options = {}) {
  const rows = parseRows(table);
  const cols = rows[0].length;
  const { align } = options;
  const colAlign = Array.from({ length: cols }, (_, i) => {
    if (Array.isArray(align)) {
      if (!['left', 'right', 'center'].includes(align[i])) throw new TableError('BAD_ALIGN');
      return align[i];
    }
    if (['left', 'right', 'center'].includes(align)) return align;
    if (align !== undefined) throw new TableError('BAD_ALIGN');
    return rows.slice(1).every((r) => r[i].trim() !== '' && !Number.isNaN(Number(r[i]))) && rows.slice(1).length > 0 ? 'right' : 'left';
  });
  const widths = rows[0].map((_, i) => Math.max(...rows.map((r) => width(r[i]))));
  const pad = (s, w, a) => {
    const p = w - width(s);
    if (a === 'right') return ' '.repeat(p) + s;
    if (a === 'center') return ' '.repeat(Math.floor(p / 2)) + s + ' '.repeat(Math.ceil(p / 2));
    return s + ' '.repeat(p);
  };
  const bar = `+${widths.map((w) => '-'.repeat(w + 2)).join('+')}+`;
  const line = (r) => `| ${r.map((c, i) => pad(c, widths[i], colAlign[i])).join(' | ')} |`;
  const out = [bar, line(rows[0]), bar];
  for (const r of rows.slice(1)) out.push(line(r));
  out.push(bar);
  return out.join('\n') + '\n';
}
