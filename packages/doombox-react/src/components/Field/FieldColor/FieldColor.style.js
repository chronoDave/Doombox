import { makeStyles } from '@material-ui/core/styles';

export const useFieldColorStyles = makeStyles(() => ({
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
  }
}));
