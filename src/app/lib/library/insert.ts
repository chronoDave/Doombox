import type { LibraryDatabase } from '../../types';
import type { WebContents } from 'electron';

import pMap from 'p-map';
import path from 'path';
import sharp from 'sharp';

import { IpcChannel } from '../../../types/ipc';
import ipcSend from '../../utils/ipcSend';
import parse from '../parser/parse';

export type InsertProps = {
  library: LibraryDatabase
  root: {
    covers: string
    thumbs: string
  }
};

const insert = (props: InsertProps) =>
  (sender: WebContents) =>
    async (files: string[]) => {
      const { songs, images } = await parse(sender)(files);

      await pMap(images.entries(), async ([b64, id]) => {
        const file = `${id}.jpg`;
        await Promise.all([
          sharp(Buffer.from(b64, 'base64'))
            .jpeg({ progressive: true })
            .toFile(path.join(props.root.covers, file)),
          sharp(Buffer.from(b64, 'base64'))
            .jpeg({ progressive: true })
            .resize(164, 164)
            .toFile(path.join(props.root.thumbs, file))
        ]);

        ipcSend(sender)(IpcChannel.Scan)({
          process: 'creating thumbnails',
          file,
          size: images.size
        });
      }, { concurrency: 32 });

      await props.library.songs.insert(songs);
    };

export default insert;
