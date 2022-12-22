import { parseFile } from 'music-metadata';
import glob from 'fast-glob';

export default (dir: string) => {
  const files = glob.sync('**/*.mp3', { cwd: dir, absolute: true });

  return Promise.all(files.map(async file => {
    const metadata = await parseFile(file, { duration: true });
    return ({ file, metadata });
  }));
};
