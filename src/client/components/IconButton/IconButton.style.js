import { makeStyles } from '@material-ui/core';

export const useIconButtonStyles = makeStyles(theme => ({
  square: {
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing()
  },
  small: {
    padding: theme.spacing(0.5)
  },
  iconSmall: {
    fontSize: theme.typography.pxToRem(20),
  },
  volumePaperRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: 90
  },
  volumeSliderRoot: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1)
  }
}));
