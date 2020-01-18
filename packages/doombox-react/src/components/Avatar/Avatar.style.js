import { makeStyles } from '@material-ui/core/styles';

export const useAvatarStyles = makeStyles(theme => ({
  avatarRoot: {
    borderRadius: '50%'
  },
  size: ({ size }) => ({
    width: theme.spacing(size),
    height: theme.spacing(size)
  }),
  hover: {
    transition: theme.transitions.create(['border-radius'], {
      duration: theme.transitions.duration.shortest,
    }),
    '&:hover': {
      borderRadius: '25%'
    }
  }
}));
