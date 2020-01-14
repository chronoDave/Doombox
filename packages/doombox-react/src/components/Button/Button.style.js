import { makeStyles, fade } from '@material-ui/core/styles';

export const useButtonStyles = makeStyles(theme => {
  const getColor = (variant = 'main') => ({ color }) => {
    if (!theme.palette[color]) return null;
    if (color === 'default' || color === 'inherit') return null;
    return theme.palette[color][variant];
  };

  const getFade = opacity => ({ color }) => {
    if (!theme.palette[color]) return null;
    if (color === 'default' || color === 'inherit') return null;
    return fade(theme.palette[color].main, opacity);
  };

  const getContrast = () => ({ color }) => {
    if (!theme.palette[color]) return null;
    if (color === 'default' || color === 'inherit') return null;
    return theme.palette[color].contrastText;
  };

  const getBorder = (opacity = 1) => ({ color }) => {
    if (!theme.palette[color]) return null;
    if (color === 'default' || color === 'inherit') return null;
    return theme.border(fade(theme.palette[color].main, opacity));
  };

  return ({
    avatarRoot: {
      borderRadius: '50%'
    },
    hover: {
      transition: theme.transitions.create(['border-radius'], {
        duration: theme.transitions.duration.shortest,
      }),
      '&:hover': {
        borderRadius: '25%'
      }
    },
    lowercase: {
      textTransform: 'none',
    },
    progressWhite: {
      color: theme.palette.grey[0]
    },
    disabled: {
      '&$disabled': {
        color: getFade(0.26)
      }
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
