import { makeStyles, fade } from '@material-ui/core/styles';

export const useContextStyles = makeStyles(theme => ({
  // Divider
  dividerLine: {
    margin: theme.spacing(0.5, 0),
    height: 1,
    flexGrow: 1,
    backgroundColor: fade(theme.palette.text.primary, 0.1),
  },
  // Item
  itemRoot: {
    display: 'inline-flex',
    justifyContent: 'flex-start',
    padding: theme.spacing(0.5, 1),
    margin: theme.spacing(0.33, 0),
    width: '100%',
    borderRadius: theme.shape.borderRadius
  },
  itemButton: {
    '&:hover': {
      backgroundColor: fade(theme.palette.text.primary, theme.palette.action.hoverOpacity)
    }
  }
}));
