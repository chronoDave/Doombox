export default (a: string, b: string) => {
  const matrix: number[][] = [];

  // Always check long => short
  const l1 = Math.max(a.length, b.length);
  const l2 = Math.min(a.length, b.length);

  // Fill matrix
  for (let i = 0; i <= l1; i += 1) {
    matrix[i] = [];

    for (let j = 0; j <= l2; j += 1) {
      matrix[i][j] = 0;
    }
  }

  // Insert prefixes
  for (let i = 1; i <= l1; i += 1) matrix[i][0] = i;
  for (let i = 1; i <= l2; i += 1) matrix[0][i] = i;

  // Find distance
  for (let j = 1; j <= l2; j += 1) {
    for (let i = 1; i <= l1; i += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1; // Check if letters are equal

      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // deletion
        matrix[i][j - 1] + 1, // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return matrix[l1][l2];
};
