#!/usr/bin/env node
// Demo: fixed table, asserts exact output. --assert exits non-zero on mismatch.
import { render } from '../src/table.mjs';

const TABLE = [['name', 'age'], ['Ana', 3], ['Beto', 27]];
const EXPECTED = [
  '+------+-----+',
  '| name | age |',
  '+------+-----+',
  '| Ana  |   3 |',
  '| Beto |  27 |',
  '+------+-----+',
  '',
].join('\n');

let failed = 0;
const got = render(TABLE);
if (got !== EXPECTED) {
  failed++;
  console.log('FAIL table differs');
  console.log(JSON.stringify(got));
} else {
  console.log('PASS bordered table exact');
}
if (process.argv.includes('--assert') && failed > 0) process.exit(1);
if (failed > 0) process.exitCode = 1;
console.log(failed === 0 ? 'demo: all cases as expected' : `demo: ${failed} mismatch(es)`);
