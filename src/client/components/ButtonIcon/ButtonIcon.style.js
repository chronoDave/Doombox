import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    flexShrink: 0,
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(),
    color: theme.palette.text,
    transition: theme.transition.create(
      ['background-color'],
      { duration: theme.transition.duration.shortest }
    ),
    '&:hover': {
      backgroundColor: theme.palette.fade(
        theme.palette.text,
        theme.palette.opacity.hover
      )
    }
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    padding: theme.spacing(0.5)
  }
}), 'buttonIcon');
