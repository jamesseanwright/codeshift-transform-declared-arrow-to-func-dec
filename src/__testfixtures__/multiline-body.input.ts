const f = () => {
  const a = 1;
  const b = 2;
  const c = 3;

  const sum = (seed: number) => [a, b, c].reduce(
    (total, n) => total + n,
    seed,
  );

  return sum(0);
};
