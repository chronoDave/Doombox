import glob from 'fast-glob';

const getPaths = (folder: string) => glob('**/*.mp3', { cwd: folder, absolute: true });

export default (folders: string[]) => Promise.all(folders.map(getPaths))
  .then(paths => paths.flat());
