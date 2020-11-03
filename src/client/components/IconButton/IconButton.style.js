import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    borderRadius: theme.spacing(),
    padding: theme.spacing(),
    color: theme.palette.text.primary,
    transition: theme.transition.create(
      ['background-color'],
      { duration: theme.transition.duration.shortest }
    ),
    '&:hover': {
      backgroundColor: theme.palette.fade(
        theme.palette.text.primary,
        theme.palette.action.hover
      )
    }
  },
  small: {
    padding: theme.spacing(0.5)
  },
  iconSmall: {
    fontSize: theme.typography.pxToRem(20)
  },
  menu: {
    backgroundColor: theme.palette.grey[2],
    padding: theme.spacing(0.5),
    display: 'flex',
    flexDirection: 'column',
    height: 90,
    width: 28,
    alignItems: 'center'
  }
}), 'iconButton');
