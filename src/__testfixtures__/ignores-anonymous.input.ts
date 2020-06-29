const addN = (...numbers: number[]) =>
  numbers.reduce(
    (total, n) => total + n,
    0,
  );
