import { makeStyles, fade } from '@material-ui/core/styles';

export const usePlaylistStyles = makeStyles(theme => ({
  active: {
    height: '100%',
    backgroundColor: fade(theme.palette.primary.main, 0.4)
  },
  activeBar: {
    position: 'absolute',
    width: theme.spacing(0.5),
    left: 0,
    backgroundColor: theme.palette.primary[
      theme.palette.type === 'dark' ?
        'main' :
        'light'
    ]
  }
}));
