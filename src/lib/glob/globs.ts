import type { Options } from 'fast-glob';

import { glob } from 'fast-glob';

export default (pattern: string, options?: Omit<Options, 'cwd'>) =>
  async (folders: string[]): Promise<string[]> => {
    const files = await Promise.all(folders.map(cwd => glob(pattern, { ...options, cwd })));
    return files.flat();
  };
