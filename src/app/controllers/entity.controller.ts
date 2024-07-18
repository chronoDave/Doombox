import type { TransferController } from '@doombox/types/ipc';
import type { Album, Label, Song } from '@doombox/types/library';
import type LeafDB from 'leaf-db';

export type EntityControllerProps = {
  song: LeafDB<Song>
  album: LeafDB<Album>
  label: LeafDB<Label>
};

export default (props: EntityControllerProps): TransferController['entity'] => ({
  song: async id => props.song.selectById(id)[0],
  songs: async ids => props.song.selectById(...ids),
  album: async id => props.album.selectById(id)[0],
  albums: async ids => props.album.selectById(...ids),
  label: async id => props.label.selectById(id)[0],
  labels: async ids => props.label.selectById(...ids)
});
