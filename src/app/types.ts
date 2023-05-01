import type { Album, Label, Song } from '../types/library';
import type LeafDB from 'leaf-db';

export type LibraryDatabase = {
  songs: LeafDB<Song>
  albums: LeafDB<Album>
  labels: LeafDB<Label>
};
