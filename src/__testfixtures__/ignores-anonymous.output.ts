function addN(...numbers: number[]) {
  return numbers.reduce((total, n) => total + n, 0);
}
