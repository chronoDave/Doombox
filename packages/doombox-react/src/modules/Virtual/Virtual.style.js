import { makeStyles, fade } from '@material-ui/core/styles';

// Utils
import { pathToUrl } from '../../utils';

export const useVirtualStyles = makeStyles(theme => ({
  image: {
    height: '100%',
    backgroundImage: ({ src }) => `url("${pathToUrl(src || '')}"`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  activeBar: {
    position: 'absolute',
    width: theme.spacing(0.5),
    left: 0,
    height: ({ size }) => theme.spacing(size),
    backgroundColor: theme.palette.primary[theme.isDarkTheme ? 'main' : 'light']
  },
  active: {
    backgroundColor: fade(theme.palette.primary.main, 0.4)
  },
  block: {
    display: 'block'
  },
  listItem: {
    paddingTop: 0,
    paddingBottom: 0,
    height: ({ size }) => theme.spacing(size)
  },
  // LibraryItem
  dividerRoot: {
    flexGrow: 0,
    marginRight: theme.spacing(2)
  },
  dividerIcon: {
    minWidth: theme.spacing(5),
    paddingLeft: theme.spacing(1.5)
  },
  // LabelItem
  dividerLabel: {
    height: 1,
    marginLeft: theme.spacing(1),
    backgroundColor: fade(theme.palette.text.primary, 0.25),
    flexGrow: 1
  },
  labelButton: {
    transition: theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.shortest,
    }),
    '&:hover': {
      backgroundColor: fade(
        theme.palette.action.active,
        theme.palette.action.hoverOpacity
      )
    }
  },
  labelImage: {
    flexShrink: 0,
    zIndex: -1,
    width: theme.dimensions.label.item,
    height: theme.dimensions.label.item
  },
  labelTypography: {
    paddingRight: theme.spacing()
  },
  labelTable: {
    borderSpacing: 0,
    paddingTop: theme.spacing()
  }
}));
