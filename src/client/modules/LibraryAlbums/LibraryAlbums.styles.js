import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    flexGrow: 1,
    backgroundColor: theme.palette.grey[1]
  },
  itemRoot: {
    display: 'flex',
    flexDirection: 'column'
  },
  itemLabel: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(0.5)
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
