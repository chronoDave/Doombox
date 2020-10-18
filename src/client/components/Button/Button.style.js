import { makeStyles } from '@material-ui/core';

export const useButtonStyles = makeStyles(theme => ({
  window: {
    minWidth: theme.spacing(5),
    padding: theme.spacing(0, 1),
    color: theme.palette.text.secondary,
    transition: theme.transitions.create(
      ['color', 'background-color'],
      { duration: theme.transitions.duration.shortest }
    ),
    '&:hover': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.action.hover
    }
  },
  windowActive: {
    color: theme.palette.common.white
  }
}));
