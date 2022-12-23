import sharp from 'sharp';

/**
 * @param {string} buffer Base-64 string
 * @param {string} file Absolute file path
 */
export const createCover = (buffer: Buffer, file: string) =>
  sharp(buffer)
    .jpeg({ progressive: true })
    .toFile(file);

/**
 * @param {string} buffer Base-64 string
 * @param {string} file Absolute file path
 */
export const createThumb = (buffer: Buffer, file: string) =>
  sharp(buffer)
    .jpeg({ progressive: true })
    .resize(300)
    .toFile(file);
