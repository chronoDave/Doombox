import { fade, makeStyles } from '@material-ui/core/styles';

export const useListStyle = makeStyles(theme => ({
  subheaderRoot: {
    whiteSpace: 'nowrap',
    color: fade(theme.palette.grey[100], 0.8)
  },
  itemRoot: {
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.25)
    }
  },
  itemActive: {
    backgroundColor: fade(theme.palette.primary.main, 0.9),
    borderRadius: theme.shape.borderRadius
  }
}));
