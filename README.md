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

This transform applies to any arrow expression that is assigned to a variable (`var`/`let`/`const`) **at the point of declaration**

<!--
type F = (x: number) => number;

let f: F;

f = x => x + 1;
-->