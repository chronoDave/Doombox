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
      padding: theme.spacing(0.5, 1)
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
  primaryActive: {
    color: theme.palette.autoContrast(
      theme.palette.primary,
      theme.palette.grey[6],
      theme.palette.grey[0]
    )
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
  label: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0
  }
}), 'virtualListItem');
