import sharp from 'sharp';

export default (b64: string, file: string) => sharp(Buffer.from(b64, 'base64'))
  .jpeg({ progressive: true })
  .toFile(file);
