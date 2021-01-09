import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0
  },
  icons: {
    display: 'flex',
    margin: theme.spacing(0.25),
    marginTop: 0
  },
  icon: {
    margin: theme.spacing(0, 0.25),
  },
  active: {
    backgroundColor: theme.palette.primary,
    color: theme.palette.autoContrast(
      theme.palette.primary,
      theme.palette.grey[0],
      theme.palette.grey[6]
    )
  },
  item: {
    display: 'flex',
    flexDirection: 'column'
  }
}), 'librarySearch');
