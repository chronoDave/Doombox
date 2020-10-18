import { makeStyles } from '@material-ui/core';

export const usePlayerStyles = makeStyles(theme => ({
  metadataImage: ({ cover = {} }) => ({
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: cover.file && theme.createBackgroundImage(cover.file),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: 150,
    width: 150,
    padding: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      width: 210,
      height: 210
    },
    [theme.breakpoints.up('md')]: {
      width: 300,
      height: 300
    }
  }),
  progressRoot: {
    padding: 0,
    height: 4,
    [theme.breakpoints.up('sm')]: {
      height: 6
    }
  },
  progressRail: {
    height: 4,
    backgroundColor: theme.palette.grey[600],
    [theme.breakpoints.up('sm')]: {
      height: 6
    }
  },
  progressTrack: {
    height: 4,
    [theme.breakpoints.up('sm')]: {
      height: 6
    }
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
    },
    [theme.breakpoints.up('sm')]: {
      height: 6,
      width: 6,
      marginLeft: -6
    }
  }
}));
