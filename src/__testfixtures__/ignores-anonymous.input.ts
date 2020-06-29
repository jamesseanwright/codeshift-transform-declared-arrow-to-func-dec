const addN = (...numbers: number[]) =>
  numbers.reduce((total, n) => total + n, 0);

/* To stop TS complaining about block-
 * scope redeclarations, as it defaults
 * to assuming files are scripts that
 * run within the same global scope. */
export default {};
