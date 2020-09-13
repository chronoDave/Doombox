import { makeStyles, fade } from '@material-ui/core/styles';

export const useButtonStyles = makeStyles(theme => ({
  baseRoot: {
    '&:hover': {
      backgroundColor: fade(
        theme.palette.type === 'dark' ? '#fff' : '#000',
        theme.palette.action.hoverOpacity
      )
    }
  }
}));
