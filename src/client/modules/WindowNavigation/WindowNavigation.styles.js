import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  button: {
    minWidth: theme.spacing(5),
    padding: theme.spacing(0, 1),
    color: theme.palette.text.disabled,
    transition: theme.transitions.create(['color', 'background-color']),
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.actions.hover
    }
  },
  active: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.actions.hover
  },
  menuRoot: {
    maxWidth: theme.breakpoints.values.xs,
    maxHeight: `calc(100vh - ${theme.spacing(4)})`,
    overflow: 'auto',
    [theme.breakpoints.create('minWidth', 'sm')]: {
      maxWidth: theme.breakpoints.values.sm
    },
    [theme.breakpoints.create('minWidth', 'md')]: {
      maxWidth: theme.breakpoints.values.md
    },
    [theme.breakpoints.create('minWidth', 'lg')]: {
      maxWidth: theme.breakpoints.values.lg
    },
    [theme.breakpoints.create('minWidth', 'xl')]: {
      maxWidth: theme.breakpoints.values.xl
    }
  },
  menuItem: {
    width: '100%',
    maxWidth: theme.breakpoints.values.xs,
    [theme.breakpoints.create('minWidth', 'sm')]: {
      maxWidth: theme.breakpoints.values.sm
    },
    [theme.breakpoints.create('minWidth', 'md')]: {
      maxWidth: theme.breakpoints.values.md
    },
    [theme.breakpoints.create('minWidth', 'lg')]: {
      maxWidth: theme.breakpoints.values.lg
    },
    [theme.breakpoints.create('minWidth', 'xl')]: {
      maxWidth: theme.breakpoints.values.xl
    }
  }
}), 'windowMenu');
