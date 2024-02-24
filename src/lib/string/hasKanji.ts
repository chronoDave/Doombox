export default (x: string) => {
  const RANGE_KANJI_START = 0x4e00;
  const RANGE_KANJI_END = 0x9faf;

  for (let i = 0; i < x.length; i += 1) {
    const c = x.charCodeAt(i);

    if (c > RANGE_KANJI_START && c <= RANGE_KANJI_END) return true;
  }

  return false;
};
