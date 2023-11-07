export type Song = {
  _id: string
  image: string | null
  file: string
  // Metadata
  duration: number | null
  artist: string | null
  title: string | null
  album: string | null
  albumartist: string | null
  label: string | null
  track: { no: number | null, of: number | null }
  disc: { no: number | null, of: number | null }
  year: number | null
  date: string | null
  cdid: string | null
  // Romaji
  romaji: {
    artist: string | null
    title: string | null
    album: string | null
    albumartist: string | null
    label: string | null
  }
};

export type Album = {
  _id: string
  image: string | null
  songs: string[]
  // Metadata
  duration: number | null
  albumartist: string | null
  album: string | null
  label: string | null
  date: string | null
  year: number | null
  cdid: string | null
  // Romaji
  romaji: {
    album: string | null
    albumartist: string | null
    label: string | null
  }
};

export type Label = {
  _id: string
  albums: string[]
  songs: string[]
  // Metadata
  label: string
  duration: number | null
  // Romaji
  romaji: {
    label: string | null
  }
};

export type Library = {
  songs: Song[],
  albums: Album[],
  labels: Label[]
};

export enum Thumb {
  Song = 96,
  Album = 384,
  Player = 512
}
