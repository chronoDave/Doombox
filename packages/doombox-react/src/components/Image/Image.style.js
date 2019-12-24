import {
  fade,
  makeStyles
} from '@material-ui/core/styles';

// Utils
import { pathToUrl } from '../../utils';

import backgroundDefault from '../../static/images/backgroundDefault.png';

export const useImageStyles = makeStyles(theme => {
  const filterImage = () => ({ src }) => [
    `linear-gradient(
      180deg,
      ${fade(theme.palette.grey[200], 0.5)},
      ${fade(theme.palette.grey[200], 0.5)}
    )`,
    `url("${pathToUrl(src || backgroundDefault)}")`
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
