import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { render, TableError } from '../src/table.mjs';

const PEOPLE = [['name', 'age'], ['Ana', 3], ['Beto', 27]];

const EXPECTED = [
  '+------+-----+',
  '| name | age |',
  '+------+-----+',
  '| Ana  |   3 |',
  '| Beto |  27 |',
  '+------+-----+',
  '',
].join('\n');

describe('render', () => {
  it('borders, header separator and numeric right-align', () => {
    assert.equal(render(PEOPLE), EXPECTED);
  });
  it('honors explicit alignment', () => {
    assert.equal(
      render([['ab'], ['x']], { align: 'center' }),
      ['+----+', '| ab |', '+----+', '| x  |', '+----+', ''].join('\n'),
    );
  });
  it('rejects ragged, empty, multiline and oversize', () => {
    assert.throws(() => render([['a'], ['b', 'c']]), (e) => e.code === 'RAGGED');
    assert.throws(() => render([]), (e) => e.code === 'EMPTY');
    assert.throws(() => render([['a\nb']]), (e) => e.code === 'MULTILINE');
    assert.throws(() => render(PEOPLE, { align: 'justify' }), (e) => e.code === 'BAD_ALIGN');
    assert.ok(new TableError('X') instanceof Error);
  });
});
