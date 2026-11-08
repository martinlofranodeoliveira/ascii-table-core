# ascii-table-core

ASCII table renderer: bordered text, header separator, per-column
alignment. Zero runtime dependencies, Node >= 22.

Part of the LOFRANO TECNOLOGIA open-source lab. MIT.

```js
import { render } from './src/table.mjs';
console.log(render([['name', 'age'], ['Ana', 3]]));
```

```sh
npm test          # 3 tests, node:test, no dependencies
npm run demo
```

At most 10000 rows, 20 columns. MIT — see `LICENSE`.
[Versão em português](README.pt-BR.md).
