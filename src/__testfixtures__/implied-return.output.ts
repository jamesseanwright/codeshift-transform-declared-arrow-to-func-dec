function f() {
 return 1;
}

/* To stop TS complaining about block-
 * scope redeclarations, as it defaults
 * to assuming files are scripts that
 * run within the same global scope. */
export default {};
