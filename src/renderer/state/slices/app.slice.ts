export type AppSlice = {
  ready: boolean
  library: {
    isEmpty: boolean
  }
};

export const setReady = (slice: AppSlice, ready: boolean) => {
  slice.ready = ready;
};

export const setLibraryEmpty = (slice: AppSlice, empty: boolean) => {
  slice.library.isEmpty = empty;
};
