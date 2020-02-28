import { makeStyles } from '@material-ui/core/styles';

export const useMixographyStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    paddingBottom: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    'will-change': 'transform',
    '&::-webkit-scrollbar': {
      width: 0
    }
  },
  activeBar: {
    position: 'absolute',
    left: 0,
    width: theme.spacing(0.5),
    height: theme.spacing(3),
    backgroundColor: theme.palette.type === 'dark' ?
      theme.palette.text.primary :
      theme.palette.text.secondary,
    borderRadius: '0px 4px 4px 0px'
  },
  itemAvatar: {
    margin: theme.spacing(0.5)
  }
}));
