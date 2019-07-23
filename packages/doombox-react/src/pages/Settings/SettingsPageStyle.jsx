const SettingsPageStyle = theme => ({
  listItemRoot: {
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      backgroundColor: theme.palette.getAlpha(
        theme.palette.primary.main, 0.25
      )
    }
  },
  listItemSelected: {
    backgroundColor: `${theme.palette.getAlpha(
      theme.palette.primary.main, 0.9
    )} !important`
  },
  listSubheaderRoot: {
    whiteSpace: 'nowrap',
    color: theme.palette.getAlpha(theme.palette.grey[100], 0.8)
  },
  listLanguageSelected: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius
  }
});

export default SettingsPageStyle;
