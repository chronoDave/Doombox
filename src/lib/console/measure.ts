import { IS_DEV } from '../const';

export default <T>(observe: () => T, label: string) => {
  if (!IS_DEV) return observe();

  console.time(label);
  const x = observe();
  console.timeEnd(label);

  return x;
};
