import type { INativeTags } from 'music-metadata/lib/type';

export default (nativeTags: INativeTags) =>
  (nativeTag: string) => {
    const tag = Object.entries(nativeTags)
      .find(([key]) => key === nativeTag);

    return tag && typeof tag[1] === 'string' ?
      tag[1] :
      null;
  };
