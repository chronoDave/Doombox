export default <T>(arr: T[]) => {
  const shuffled = arr.slice(0);

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const r = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[r]] = [shuffled[r], shuffled[i]];
  }

  return shuffled;
};
