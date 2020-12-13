import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    minWidth: 0
  },
  overlay: {
    alignItems: 'flex-start'
  },
  tabs: {
    padding: theme.spacing(),
    display: 'flex',
    flexDirection: 'column'
  },
  body: {
    padding: theme.spacing(),
    flexGrow: 1
  },
  close: {
    padding: theme.spacing(),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  button: {
    color: theme.palette.text.disabled,
    padding: theme.spacing(0, 1),
    margin: theme.spacing(1, 0),
    transition: theme.transition.create(
      ['color'],
      { duration: theme.transition.duration.shortest }
    ),
    '&:hover': {
      color: theme.palette.text.primary
    }
  },
  buttonActive: {
    borderRight: theme.border(theme.palette.text.primary),
    color: theme.palette.text.primary
  }
}), 'overlaySettings');
