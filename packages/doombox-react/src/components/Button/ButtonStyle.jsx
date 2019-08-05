import { fade } from '@material-ui/core/styles/colorManipulator';

const ButtonStyle = theme => ({
  lowercase: {
    textTransform: 'none',
  },
  progressWhite: {
    color: theme.palette.grey[0]
  },
  color_text_error: {
    color: theme.palette.error.main,
    '&:hover': {
      backgroundColor: fade(
        theme.palette.error.main,
        theme.palette.action.hoverOpacity
      ),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
  color_text_warning: {
    color: theme.palette.warning.main,
    '&:hover': {
      backgroundColor: fade(
        theme.palette.warning.main,
        theme.palette.action.hoverOpacity
      ),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
  color_text_success: {
    color: theme.palette.success.main,
    '&:hover': {
      backgroundColor: fade(
        theme.palette.success.main,
        theme.palette.action.hoverOpacity
      ),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
  color_text_info: {
    color: theme.palette.info.main,
    '&:hover': {
      backgroundColor: fade(
        theme.palette.info.main,
        theme.palette.action.hoverOpacity
      ),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
  color_outlined_error: {
    color: theme.palette.error.main,
    border: theme.border(fade(theme.palette.error.main, 0.5)),
    '&:hover': {
      border: theme.border(theme.palette.error.main),
      backgroundColor: fade(
        theme.palette.error.main,
        theme.palette.action.hoverOpacity
      ),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
  color_outlined_warning: {
    color: theme.palette.warning.main,
    border: theme.border(fade(theme.palette.warning.main, 0.5)),
    '&:hover': {
      border: theme.border(theme.palette.warning.main),
      backgroundColor: fade(
        theme.palette.warning.main,
        theme.palette.action.hoverOpacity
      ),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
  color_outlined_success: {
    color: theme.palette.success.main,
    border: theme.border(fade(theme.palette.success.main, 0.5)),
    '&:hover': {
      border: theme.border(theme.palette.success.main),
      backgroundColor: fade(
        theme.palette.success.main,
        theme.palette.action.hoverOpacity
      ),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
  color_outlined_info: {
    color: theme.palette.info.main,
    border: theme.border(fade(theme.palette.info.main, 0.5)),
    '&:hover': {
      border: theme.border(theme.palette.info.main),
      backgroundColor: fade(
        theme.palette.info.main,
        theme.palette.action.hoverOpacity
      ),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
  color_contained_error: {
    color: theme.palette.error.contrastText,
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
      '@media (hover: none)': {
        backgroundColor: theme.palette.error.main,
      },
    },
  },
  color_contained_warning: {
    color: theme.palette.warning.contrastText,
    backgroundColor: theme.palette.warning.main,
    '&:hover': {
      backgroundColor: theme.palette.warning.dark,
      '@media (hover: none)': {
        backgroundColor: theme.palette.warning.main,
      },
    },
  },
  color_contained_success: {
    color: theme.palette.success.contrastText,
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
      '@media (hover: none)': {
        backgroundColor: theme.palette.success.main,
      },
    },
  },
  color_contained_info: {
    color: theme.palette.info.contrastText,
    backgroundColor: theme.palette.info.main,
    '&:hover': {
      backgroundColor: theme.palette.info.dark,
      '@media (hover: none)': {
        backgroundColor: theme.palette.info.main,
      },
    },
  },
});

export default ButtonStyle;
