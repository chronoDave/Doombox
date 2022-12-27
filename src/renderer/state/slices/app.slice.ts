export type AppSlice = {
  ready: boolean
  library: {
    isEmpty: boolean
  }
};

export default (slice: AppSlice) => ({
  setReady: (ready: boolean) => {
    slice.ready = ready;
  },
  setLibraryEmpty: (empty: boolean) => {
    slice.library.isEmpty = empty;
  }
});
