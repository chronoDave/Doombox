import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    width: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.grey[2],
    boxShadow: theme.shadows[4]
  },
  itemRoot: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 1.5),
    transition: theme.transition.create(
      ['background-color'],
      { duration: theme.transition.duration.shortest }
    ),
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    }
  },
  itemSecondary: {
    marginLeft: theme.spacing(3)
  },
  itemDivider: {
    borderBottom: theme.border(theme.palette.grey[50])
  }
}), 'menu');
