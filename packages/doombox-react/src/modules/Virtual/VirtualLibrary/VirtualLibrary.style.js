import { makeStyles } from '@material-ui/core/styles';

export const useVirtualLibraryStyles = makeStyles(theme => ({
  itemRoot: {
    justifyContent: 'flex-start',
    padding: theme.spacing(1, 2),
    borderBottom: theme.border(theme.palette.grey[400]),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    },
  },
  active: {
    backgroundColor: theme.palette.primary.main,
    borderColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    }
  }
}));
