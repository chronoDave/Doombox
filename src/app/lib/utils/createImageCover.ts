import sharp from 'sharp';

export default (buffer: Buffer, file: string) => sharp(buffer)
  .jpeg({ progressive: true })
  .toFile(file);
