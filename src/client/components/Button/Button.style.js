import { makeStyles, fade } from '@material-ui/core';

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
