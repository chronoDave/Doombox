import { makeStyles, darken } from '@material-ui/core/styles';

export const useInputColorStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: ({ size }) => theme.spacing(size * 1.5),
    height: ({ size }) => theme.spacing(size),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: ({ color }) => color || 'transparent',
    transition: theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.shortest,
    }),
    '&:hover': {
      backgroundColor: ({ color }) => (color ?
        darken(color, 0.23) :
        'transparent'),
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    }
  }
}));
