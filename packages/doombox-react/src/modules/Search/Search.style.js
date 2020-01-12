import { makeStyles } from '@material-ui/core/styles';

export const useSearchStyles = makeStyles(theme => ({
  iconCancel: {
    transition: theme.transitions.create('color', {
      duration: theme.transitions.duration.shortest,
    }),
    '&:hover': {
      color: theme.palette.grey[600],
      backgroundColor: 'none'
    }
  }
}));
