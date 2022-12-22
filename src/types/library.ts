export type Image = {
  // Keys
  _id: string
};

export type Song = {
  // Headers
  _id: string
  _image?: string
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
};
