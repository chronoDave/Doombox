import {
  fade,
  makeStyles
} from '@material-ui/core/styles';

// Utils
import { pathToUrl } from '../../utils';

import backgroundDefault from '../../static/images/backgroundDefault.png';

export const useImageStyles = makeStyles(theme => ({
  root: ({ src, disableDefault, disableOverlay }) => {
    const url = `url("${pathToUrl(src || (!disableDefault && backgroundDefault))}")`;
    const overlay = `linear-gradient(
      180deg,
      ${fade(theme.palette.grey[theme.isDarkTheme ? 200 : 800], 0.5)},
      ${fade(theme.palette.grey[theme.isDarkTheme ? 200 : 800], 0.5)}
    )`;

    return ({
      backgroundImage: !disableOverlay ?
        [overlay, url] :
        url,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    });
  }
}));
