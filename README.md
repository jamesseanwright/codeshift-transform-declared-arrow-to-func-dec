# Codeshift Declared Arrow Expression to Function Declaration Transform

[jscodeshift](https://github.com/facebook/jscodeshift) transform to convert arrow function expressions, assigned to variable declarations, into traditional function declarations

Before:

```ts
const foo = 1;
const bar = 2;

const add = (a: number, b: number) => {
  return a + b;
};

add(foo, bar);
```

After:

```ts
const foo = 1;
const bar = 2;

function add(a: number, b: number) {
  return a + b;
}

add(foo, bar);
```

This transform applies to any arrow expression that is assigned to a variable (`var`/`let`/`const`) **at the point of declaration**.

## Examples

### Implied/implicit return

Before:

```ts
const f = () => 1;
```

After:

```ts
function f() {
  return 1;
}
```

### Async functions

Before:

```ts
const get = async () => {
  const res = await fetch('/foo');
  return res.json();
};
```

After:

```ts
async function get() {
  const res = await fetch('/foo');
  return res.json();
}
```

### Exported functions

Before:

```ts
export const f = () => Promise.resolve('Yay!');
```

After:

```ts
export function f() {
  return Promise.resolve('Yay!');
}
```

### Complex functions

Before:

```ts
const f = () => {
  const a = 1;
  const b = 2;
  const c = 3;
  const sum = (seed: number) => [a, b, c].reduce((total, n) => total + n, seed);

  return sum(0);
};
```

After:

```ts
function f() {
  const a = 1;
  const b = 2;
  const c = 3;

  function sum(seed: number) {
    return [a, b, c].reduce((total, n) => total + n, seed);
  }

  return sum(0);
}
```

<!--
type F = (x: number) => number;

let f: F;

f = x => x + 1;
-->