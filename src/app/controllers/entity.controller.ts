import type { TransferController } from '@doombox/types/ipc';
import type { Album, Label, Song } from '@doombox/types/library';
import type LeafDB from 'leaf-db';

export type EntityControllerProps = {
  song: LeafDB<Song>
  album: LeafDB<Album>
  label: LeafDB<Label>
};

export default (props: EntityControllerProps): TransferController['entity'] => ({
  song: async _id => props.song.select({ _id })[0],
  album: async _id => props.album.select({ _id })[0],
  label: async _id => props.label.select({ _id })[0]
});
