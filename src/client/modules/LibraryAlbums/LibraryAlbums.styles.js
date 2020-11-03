import { makeStyles } from '../../theme';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    flexGrow: 1
  },
  itemRoot: {
    display: 'flex',
    flexDirection: 'column'
  },
  itemLabel: {
    display: 'flex',
    flexDirection: 'column'
  },
  itemAlbums: {
    display: 'flex',
    flexWrap: 'wrap'
  }
}), 'libraryAlbums');
