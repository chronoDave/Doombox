import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100%',
    flexGrow: 1,
    minWidth: 0,
    maxWidth: theme.breakpoints.values.md,
    [theme.breakpoints.create('minWidth', 'sm')]: {
      paddingLeft: theme.spacing(),
      paddingRight: theme.spacing()
    },
    [theme.breakpoints.create('minHeight', 'sm')]: {
      paddingTop: theme.spacing(),
      paddingBottom: theme.spacing()
    }
  },
  overlay: {
    alignItems: 'flex-start'
  },
  tabs: {
    padding: theme.spacing(),
    display: 'flex',
    flexDirection: 'column'
  },
  body: {
    padding: theme.spacing(),
    flexGrow: 1,
  },
  close: {
    padding: theme.spacing(),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  tab: {
    display: 'flex',
    justifyContent: 'center',
    color: theme.palette.text.disabled,
    padding: theme.spacing(1, 1.5),
    borderRadius: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5)
  },
  tabActive: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.text
  },
  tabHover: {
    transition: theme.transitions.create(['color', 'background-color']),
    '&:hover': {
      backgroundColor: theme.palette.overlay(
        theme.palette.primary.main,
        theme.palette.opacity.inactive
      ),
      color: theme.palette.text.primary
    }
  }
}), 'overlaySettings');
