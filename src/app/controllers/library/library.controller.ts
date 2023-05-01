import type { IpcInvokeController } from '../../../types/ipc';
import type { UserShape } from '../../../types/shapes/user.shape';
import type { InsertProps } from '../../lib/library/insert';
import type Storage from '../../lib/storage/storage';
import type { WebContents } from 'electron';

import glob from 'fast-glob';
import fs from 'fs';

import { IpcChannel } from '../../../types/ipc';
import difference from '../../../utils/array/difference';
import createGet from '../../lib/library/get';
import createInsert from '../../lib/library/insert';
import createRebuild from '../../lib/library/rebuild';
import ipcSend from '../../utils/ipc/ipcSend';

export type LibraryControllerProps = InsertProps & {
  storage: Storage<UserShape>
};

export default (props: LibraryControllerProps) =>
  (sender: WebContents): IpcInvokeController[IpcChannel.Library] => {
    const insert = createInsert(props)(sender);
    const rebuild = createRebuild(props.library);
    const globAll = (folders: string[], pattern: string) =>
      Promise.all(folders.map(folder => glob(pattern, { cwd: folder, absolute: true })))
        .then(x => x.flat());

    return ({
      get: createGet(props.library),
      reindex: async folders => {
        const oldSongs = await props.library.songs.find({});
        const oldFiles = oldSongs.map(song => song.file);
        const files = await globAll(folders, '**/*.mp3');
        const stale = oldSongs.filter(song => !files.includes(song.file));
        const fresh = difference(files, oldFiles);

        await props.library.songs.delete(stale.map(song => song._id));
        await insert(fresh);

        return rebuild();
      },
      rebuild: async () => {
        const { library } = props.storage.get();

        props.library.songs.drop();
        fs.rmSync(props.root.covers, { recursive: true, force: true });
        fs.rmSync(props.root.thumbs, { recursive: true, force: true });
        fs.mkdirSync(props.root.covers, { recursive: true });
        fs.mkdirSync(props.root.thumbs, { recursive: true });
        const files = await globAll(library.folders, '**/*.mp3');
        await insert(files);

        return rebuild();
      },
      add: async folders => {
        const current = await props.library.songs.find({});
        const files = await globAll(folders, '**/*.mp3');
        const fresh = files.filter(file => current.every(song => song.file !== file));
        await insert(fresh);

        return rebuild();
      },
      remove: async folders => {
        const files = await globAll(folders, '**/*.mp3');

        await Promise.all(files.map(file => {
          ipcSend(sender)(IpcChannel.Scan)({ process: 'deleting files', file, size: files.length });
          return props.library.songs.deleteOne({ file });
        }));

        return rebuild();
      }
    });
  };
