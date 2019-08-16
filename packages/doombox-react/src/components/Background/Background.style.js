import { fade, makeStyles } from '@material-ui/core/styles';

// Utils
import { normalizeUrl } from '../../utils';

export const useBackgroundStyle = makeStyles(theme => ({
  root: {
    position: 'fixed',
    height: '100vh',
    width: '100vw',
    zIndex: -1
  },
  image: {
    backgroundImage: ({ user }) => `url("${normalizeUrl(
      (user && user.background && user.background.path) ?
        user.background.path :
        `${__dirname}/static/images/backgroundDefault.png`
    )}")`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  fade: {
    backgroundImage: ({ opacity = 1 }) => `linear-gradient(
      180deg,
      ${fade(theme.palette.background.default, opacity / 2)},
      ${fade(theme.palette.background.default, opacity)}
    )`
  }
}));
