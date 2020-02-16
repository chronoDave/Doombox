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
    const alpha = fade(theme.palette.grey[theme.palette.type === 'dark' ? 200 : 800], 0.66);
    const overlay = `linear-gradient(180deg, ${alpha}, ${alpha})`;

    return ({
      backgroundImage: !disableOverlay ? [overlay, url] : url,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    });
  },
  background: {
    width: 'calc(100% - 9px)',
    height: '100%',
    position: 'absolute'
  }
}));
