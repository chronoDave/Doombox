import { makeStyles } from '@material-ui/core/styles';

export const useButtonStyles = makeStyles(theme => ({
  avatarRoot: {
    borderRadius: '50%'
  },
  hover: {
    transition: theme.transitions.create(['border-radius'], {
      duration: theme.transitions.duration.shortest,
    }),
    '&:hover': {
      borderRadius: '25%'
    }
  }
}));
