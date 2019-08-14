import { makeStyles } from '@material-ui/core/styles';

export const useFieldFileStyle = makeStyles(theme => ({
  hidden: {
    width: 0.1,
    height: 0.1,
    opacity: 0,
    overflow: 'hidden',
    position: 'absolute',
    zIndex: -1
  },
  label: {
    display: 'inline-block',
    '&:focus': {
      outline: 'none'
    }
  },
  error: {
    color: theme.palette.error.main
  },
  root: {
    position: 'relative'
  },
  fieldFileIcon: {
    position: 'absolute',
    left: 80,
    bottom: 80,
    zIndex: 1,
    color: theme.palette.grey[0],
    backgroundColor: theme.palette.grey[200],
    '&:hover': {
      backgroundColor: theme.palette.grey[100]
    }
  },
  fieldFileAvatar: {
    padding: 0
  }
}));
