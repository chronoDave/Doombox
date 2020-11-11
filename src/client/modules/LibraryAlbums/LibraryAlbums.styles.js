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
  },
  itemButton: {
    width: 75,
    height: 75
  },
  itemCover: {
    width: '100%',
    height: '100%'
  }
}), 'libraryAlbums');
