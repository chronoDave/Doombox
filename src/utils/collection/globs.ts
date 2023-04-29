import glob from 'fast-glob';

export default (folders: string[], pattern: string) =>
  Promise.all(folders.map(folder => glob(pattern, { cwd: folder, absolute: true })))
    .then(x => x.flat());
