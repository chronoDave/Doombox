import {
  fade,
  makeStyles
} from '@material-ui/core/styles';

// Utils
import { pathToUrl } from '../../utils';

import backgroundDefault from '../../static/images/backgroundDefault.png';

export const useImageStyles = makeStyles(theme => {
  const filterImage = () => ({ src, disableDefault }) => [
    `linear-gradient(
      180deg,
      ${fade(theme.palette.grey[theme.isDarkTheme ? 200 : 800], 0.5)},
      ${fade(theme.palette.grey[theme.isDarkTheme ? 200 : 800], 0.5)}
    )`,
    `url("${pathToUrl(src || (disableDefault ? '' : backgroundDefault))}")`
  ];

  return ({
    root: {
      backgroundImage: filterImage(),
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }
  });
});
