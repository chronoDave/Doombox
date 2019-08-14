import { fade, makeStyles } from '@material-ui/core/styles';

// Utils
import { normalizeUrl } from '../../utils';

export const useBackgroundStyle = makeStyles(theme => ({
  root: {
    height: '100vh',
    width: '100vw'
  },
  image: {
    position: 'fixed',
    backgroundImage: user => `url("${normalizeUrl(
      (user && user.background && user.background.path) ?
        user.background.path :
        `${__dirname}/static/images/backgroundDefault.png`
    )}")`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    zIndex: -1
  },
  fade: {
    backgroundImage: `linear-gradient(
      180deg,
      ${fade(theme.palette.background.default, 0.33)},
      ${fade(theme.palette.background.default, 0.66)}
    )`,
    top: 0,
    left: 0,
  }
}));
