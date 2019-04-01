const MainDrawerListStyle = theme => ({
  root: {
    width: '100%'
  },
  listItemRoot: {
    color: theme.palette.grey[50]
  },
  listItemAvatarRoot: {
    padding: 0
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: 500
  },
  listItemSecondaryActionTypography: {
    color: theme.palette.grey[200]
  },
  avatar: {
    background: 'none'
  }
});

export default MainDrawerListStyle;
