import { makeStyles, fade } from '@material-ui/core/styles';

export const useLabelStyles = makeStyles(theme => ({
  divider: {
    height: 1,
    marginLeft: theme.spacing(1),
    backgroundColor: fade(theme.palette.text.primary, 0.25),
    flexGrow: 1
  },
  albumButton: {
    transition: theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.shortest,
    }),
    '&:hover': {
      backgroundColor: fade(
        theme.palette.action.active,
        theme.palette.action.hoverOpacity
      )
    }
  },
  albumImage: {
    flexShrink: 0,
    zIndex: -1,
    width: theme.dimensions.label.item,
    height: theme.dimensions.label.item
  }
}));
