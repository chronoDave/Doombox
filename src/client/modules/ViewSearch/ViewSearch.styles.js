import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0
  },
  icon: {
    margin: theme.spacing(0.5)
  },
  icons: {
    display: 'flex'
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
}), 'viewSearch');
