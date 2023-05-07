import type { LibraryDatabase } from '../../types';
import type { WebContents } from 'electron';

import pMap from 'p-map';
import path from 'path';
import sharp from 'sharp';

import { IpcChannel } from '../../../types/ipc';
import { Thumb } from '../../../types/library';
import ipcSend from '../../utils/ipcSend';
import parse from '../parser/parse';

export type InsertProps = {
  library: LibraryDatabase
  root: string
};

const insert = (props: InsertProps) =>
  (sender: WebContents) =>
    async (files: string[]) => {
      const { songs, images } = await parse(sender)(files);

      await pMap(images.entries(), async ([b64, id]) => {
        const buffer = Buffer.from(b64, 'base64');
        const writeImage = (size: number) => sharp(buffer)
          .jpeg({ progressive: true })
          .resize({ width: size, height: size })
          .toFile(path.join(props.root, `${id}x${size}.jpg`));

        await Promise.all([
          writeImage(Thumb.Song),
          writeImage(Thumb.Album),
          writeImage(Thumb.Player)
        ]);

        ipcSend(sender)(IpcChannel.Scan)({
          process: 'creating thumbnails',
          file: id,
          size: images.size
        });
      }, { concurrency: 16 });

      await props.library.songs.insert(songs);
    };

export default insert;
