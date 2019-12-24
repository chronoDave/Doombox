import { makeStyles, fade } from '@material-ui/core/styles';

export const useModalStyle = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: theme.dimensions.appBar,
    outline: 0,
    height: `calc(100% - ${theme.dimensions.appBar}px)`,
    width: '100%'
  },
  backdrop: ({ backgroundOpacity }) => ({
    backgroundColor: fade(
      theme.palette.grey[50],
      backgroundOpacity ? 0.9 : 1
    )
  })
}));
