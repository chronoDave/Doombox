import { makeStyles } from '@material-ui/core/styles';

export const useTypographyStyle = makeStyles(theme => {
  const getColor = () => ({ color }) => {
    if (color === 'inherit' || color === 'initial') return null;
    if (color.includes('grey')) {
      const variant = parseInt(color.split('.')[1], 10);
      return { color: theme.palette.grey[variant] };
    }
    return { color: theme.palette[color].main };
  };

  const getTransform = () => ({ transform }) => {
    if (transform === 'default') return null;
    return { textTransform: transform };
  };

  return ({
    color: getColor(),
    transform: getTransform(),
    breakWord: {
      wordBreak: 'break-word',
      textAlign: 'left'
    }
  });
});
