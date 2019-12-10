import {
  fade,
  makeStyles
} from '@material-ui/core/styles';
import path from 'path';

// Utils
import { pathToUrl } from '../../utils';

export const useImageStyles = makeStyles(theme => {
  const defaultImage = path.resolve(__dirname, '../../static/images/backgroundDefault.png');

  const filterImage = () => ({ src }) => [
    `linear-gradient(
      180deg,
      ${fade(theme.palette.grey[200], 0.5)},
      ${fade(theme.palette.grey[200], 0.5)}
    )`,
    `url("${pathToUrl(src || defaultImage)}")`
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
