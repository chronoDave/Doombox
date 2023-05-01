import type { INativeTags } from 'music-metadata/lib/type';

export default <T extends INativeTags>(nativeTags: T) =>
  (nativeTag: keyof T): unknown => {
    const tags = Object.values(nativeTags).flat();
    const tag = tags.find(itag => itag.id === nativeTag);

    return tag?.value;
  };
