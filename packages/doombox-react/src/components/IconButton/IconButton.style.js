import { makeStyles, fade } from '@material-ui/core/styles';

export const useIconButtonStyles = makeStyles(theme => ({
  root: {
    fontSize: '1.75rem',
    borderRadius: 0,
    width: '100%',
    color: theme.palette.text[theme.palette.type === 'dark' ? 'primary' : 'secondary']
  },
  active: {
    backgroundColor: fade(theme.palette.primary.main, 0.4)
  },
  activeBar: {
    position: 'absolute',
    width: theme.spacing(0.5),
    left: 0,
    height: '52px',
    backgroundColor: theme.palette.primary[theme.palette.type === 'dark' ? 'main' : 'light']
  }
}));
