import { makeStyles, fade } from '@material-ui/core/styles';

export const useLibraryStyles = makeStyles(theme => ({
  activeBar: {
    position: 'absolute',
    width: theme.spacing(0.5),
    left: 0,
    backgroundColor: theme.palette.primary[theme.palette.type === 'dark' ? 'main' : 'light']
  },
  active: {
    height: '100%',
    backgroundColor: fade(theme.palette.primary.main, 0.4)
  },
  block: {
    display: 'block'
  },
  listItem: {
    paddingTop: 0,
    paddingBottom: 0
  },
  dividerRoot: {
    flexGrow: 0,
    marginRight: theme.spacing(2)
  },
  dividerIcon: {
    minWidth: theme.spacing(5),
    paddingLeft: theme.spacing(1.5)
  }
}));
