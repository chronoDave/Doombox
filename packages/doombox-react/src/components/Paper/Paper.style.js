import { makeStyles, fade } from '@material-ui/core/styles';

// Utils
import { cleanUrl } from '../../utils';

export const usePaperStyle = makeStyles(theme => {
  const getImage = () => ({ path }) => {
    if (!path) return null;
    return [
      `linear-gradient(
        180deg,
        ${fade(theme.palette.grey[600], 0.66)},
        ${fade(theme.palette.grey[600], 0.66)}
      )`,
      `url("file://${cleanUrl(path)}")`
    ];
  };

  return ({
    root: {},
    image: {
      backgroundImage: getImage(),
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }
  });
});
