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
  fieldFileAvatar: {
    padding: 0
  }
}));
