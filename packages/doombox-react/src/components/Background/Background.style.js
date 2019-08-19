import { fade, makeStyles } from '@material-ui/core/styles';

import backgroundDefault from '../../static/images/backgroundDefault.png';

export const useBackgroundStyle = makeStyles(theme => {
  const getBackgroundImage = () => ({ user }) => {
    if (user && user.background) return `url("${user.background.path}")`;
    return `url(${backgroundDefault})`;
  };

  return ({
    root: {
      position: 'fixed',
      height: '100vh',
      width: '100vw',
      zIndex: -1
    },
    image: {
      backgroundImage: getBackgroundImage(),
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
  });
});
