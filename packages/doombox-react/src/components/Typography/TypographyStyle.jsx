const TypographyStyle = theme => ({
  color_error: {
    color: theme.palette.error.main
  },
  color_warning: {
    color: theme.palette.warning.main
  },
  color_success: {
    color: theme.palette.success.main
  },
  color_textTertiary: {
    color: theme.palette.getAlpha(theme.palette.grey[0], 0.5)
  },
  color_info: {
    color: theme.palette.info.main
  },
  color_white: {
    color: theme.palette.grey[0]
  },
  transform_default: {},
  transform_uppercase: {
    textTransform: 'uppercase'
  },
  transform_lowercase: {
    textTransform: 'lowercase'
  }
});

export default TypographyStyle;
