import glob from 'fast-glob';

export default (pattern: string) => (folders: string[]) =>
  Promise.all(folders.map(folder => glob(pattern, {
    cwd: folder,
    absolute: true
  })))
    .then(files => files.flat());
