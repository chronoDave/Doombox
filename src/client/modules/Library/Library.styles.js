import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
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
}), 'library');
