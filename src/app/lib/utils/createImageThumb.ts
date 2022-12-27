import sharp from 'sharp';

export default (buffer: Buffer, file: string) => sharp(buffer)
  .jpeg({ progressive: true })
  .resize(300)
  .toFile(file);
