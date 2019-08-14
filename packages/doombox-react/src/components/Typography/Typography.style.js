import { makeStyles } from '@material-ui/core/styles';

export const useTypographyStyle = makeStyles(theme => {
  const getColor = () => ({ color }) => {
    if (color === 'inherit' || color === 'initial') return null;
    if (color.includes('grey')) return theme.palette[color];
    return theme.palette[color].main;
  };

  const getTransform = () => ({ transform }) => {
    if (transform === 'default') return null;
    return { textTransform: transform };
  };

  return ({
    color: getColor(),
    transform: getTransform(),
  });
});
