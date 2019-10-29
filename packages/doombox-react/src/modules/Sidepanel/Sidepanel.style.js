import { makeStyles, fade } from '@material-ui/core/styles';

// Utils
import { cleanUrl } from '../../utils';

export const useSidepanelStyle = makeStyles(theme => {
  const getBackgroundImage = () => ({ image, opacity }) => {
    return null;
    // if (!image) return null;
    // return [
    //   `linear-gradient(
    //     180deg,
    //     ${fade(theme.palette.grey[600], opacity)},
    //     ${fade(theme.palette.grey[600], opacity)}
    //   )`,
    //   `url("file://${cleanUrl(image.path)}")`
    // ];
  };

  return ({
    paper: {
      width: theme.component.sidepanel,
      backgroundColor: theme.palette.grey[500],
      backgroundPosition: 'center'
    },
    iconButtonRoot: {
      padding: theme.spacing(),
      color: theme.palette.grey[50]
    },
    paperAnchorLeft: {
      left: theme.component.sidebar
    },
    paperRoot: {
      width: ({ padding }) => `${theme.component.sidepanel - theme.spacing(padding * 2)}px`,
      height: ({ padding }) => `${theme.component.sidepanel - theme.spacing(padding * 2)}px`,
      backgroundImage: getBackgroundImage(),
      backgroundSize: 'contain'
    },
    noWrap: {
      width: '100%',
      display: '-webkit-box',
      '-webkit-line-clamp': 2,
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden'
    }
  });
});
