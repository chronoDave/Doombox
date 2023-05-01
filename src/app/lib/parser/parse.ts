import type { WebContents } from 'electron';

import LeafDB from 'leaf-db';
import pMap from 'p-map';

import { IpcChannel } from '../../../types/ipc';
import ipcSend from '../../utils/ipcSend';

import parseFile from './parseFile';

export default (sender: WebContents) => async (files: string[]) => {
  const images = new Map<string, string>();
  const songs = await pMap(files, async file => {
    const song = await parseFile(file);
    if (song.image) {
      if (!images.has(song.image)) images.set(song.image, LeafDB.generateId());
      song.image = images.get(song.image) ?? null;
    }

    ipcSend(sender)(IpcChannel.Scan)({
      process: 'parsing files',
      file,
      size: files.length
    });

    return song;
  }, { concurrency: 64 });

  return ({ songs, images });
};
