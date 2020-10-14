import { makeStyles } from '@material-ui/core';

export const usePlayerStyles = makeStyles(theme => ({
  iconButtonRoot: {
    padding: theme.spacing(0.5),
    [theme.breakpoints.up(theme.breakpoints.keys.small)]: {
      margin: theme.spacing(0, 0.5)
    }
  },
  iconButtonIcon: {
    fontSize: theme.typography.pxToRem(20),
    [theme.breakpoints.up(theme.breakpoints.keys.small)]: {
      fontSize: theme.typography.pxToRem(24)
    }
  },
  buttonsRoot: {
    display: 'flex',
    justifyContent: 'space-around',
    [theme.breakpoints.up(theme.breakpoints.keys.small)]: {
      justifyContent: 'center'
    }
  },
  metadataImage: ({ cover = {} }) => ({
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: cover.file && theme.createBackgroundImage(cover.file),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: 150,
    width: 150,
    padding: theme.spacing(1),
    [theme.breakpoints.up(theme.breakpoints.keys.small)]: {
      width: 210,
      height: 210
    },
    [theme.breakpoints.up(theme.breakpoints.keys.medium)]: {
      width: 300,
      height: 300
    }
  }),
  progressRoot: {
    padding: 0,
    height: 4
  },
  progressRail: {
    height: 4,
    backgroundColor: theme.palette.grey[600]
  },
  progressTrack: {
    height: 4
  },
  progressThumb: {
    height: 4,
    width: 4,
    margin: 0,
    marginLeft: -4,
    borderRadius: 'initial',
    color: theme.palette.primary.light,
    '&:after': {
      display: 'none'
    },
    '&.MuiSlider-active': {
      boxShadow: 'initial'
    }
  }
}));
