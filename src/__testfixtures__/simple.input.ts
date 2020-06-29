const foo = 1;
const bar = 2;

const add = (a: number, b: number) => {
  return a + b;
};

add(foo, bar);

/* To stop TS complaining about block-
 * scope redeclarations, as it defaults
 * to assuming files are scripts that
 * run within the same global scope. */
export default {};
