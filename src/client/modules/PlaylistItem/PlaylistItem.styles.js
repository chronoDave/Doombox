import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    padding: theme.spacing(0.5),
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.alpha(
      theme.palette.dark ?
        theme.palette.grey[2] :
        theme.palette.white,
      theme.palette.opacity.primary
    ),
    transition: theme.transitions.create(['color', 'background-color']),
    '&:hover': {
      backgroundColor: theme.palette.dark ?
        theme.palette.grey[2] :
        theme.palette.grey[5]
    },
    [theme.breakpoints.create('minWidth', 'sm')]: {
      paddingLeft: theme.spacing(1.5)
    }
  },
  active: {
    backgroundColor: theme.palette.primary,
    '&:hover': {
      backgroundColor: theme.palette.alpha(
        theme.palette.primary,
        theme.palette.opacity.secondary
      )
    }
  },
  primary: {
    color: theme.palette.text.primary,
  },
  primaryActive: {
    color: theme.palette.autoContrast(
      theme.palette.primary,
      theme.palette.grey[6],
      theme.palette.grey[0]
    )
  },
  secondary: {
    color: theme.palette.text.secondary
  },
  secondaryActive: {
    color: theme.palette.autoContrast(
      theme.palette.primary,
      theme.palette.grey[5],
      theme.palette.grey[1]
    )
  },
  index: {
    minWidth: theme.spacing(4),
    marginRight: theme.spacing()
  },
  metadata: {
    display: 'flex',
    flexDirection: 'column'
  }
}), 'playlistItem');
