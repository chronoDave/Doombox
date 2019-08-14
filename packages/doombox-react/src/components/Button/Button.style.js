import { fade, makeStyles } from '@material-ui/core/styles';

export const useButtonStyle = makeStyles(theme => {
  const getColor = (variant = 'main') => ({ color }) => {
    if (color === 'default' || color === 'inherit') return null;
    return theme.palette[color][variant];
  };

  const getFade = opacity => ({ color }) => {
    if (color === 'default' || color === 'inherit') return null;
    return fade(theme.palette[color].main, opacity);
  };

  const getContrast = () => ({ color }) => {
    if (color === 'default' || color === 'inherit') return null;
    return theme.palette[color].contrastText;
  };

  const getBorder = (opacity = 1) => ({ color }) => {
    if (color === 'default' || color === 'inherit') return null;
    return theme.border(fade(theme.palette[color].main, opacity));
  };

  return ({
    lowercase: {
      textTransform: 'none',
    },
    progressWhite: {
      color: theme.palette.grey[0]
    },
    variant: {
      color: getColor(),
      '&:hover': {
        backgroundColor: getFade(theme.palette.action.hoverOpacity),
        '@media (hover: none)': {
          backgroundColor: 'transparent'
        }
      }
    },
    outlined: {
      border: getBorder(0.5)
    },
    contained: {
      color: getContrast(),
      backgroundColor: getColor(),
      '&:hover': {
        backgroundColor: getColor('dark'),
        '@media (hover: none)': {
          backgroundColor: getColor(),
        },
      },
    }
  });
});
