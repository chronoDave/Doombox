import path from 'path';
import sharp from 'sharp';

export default (file: string) => (b64: string, name: string) => sharp(Buffer.from(b64, 'base64'))
  .jpeg({ progressive: true })
  .toFile(path.join(file, `${name}.jpg`));
