const SideMenuItemStyle = theme => ({
  listItemRoot: {

  },
  listItemSelected: {
    backgroundColor: `${theme.palette.primary.main} !important`,
  },
  listItemTextSelected: {
    color: theme.palette.grey[0],
    fontWeight: 500
  },
  listItemIconRoot: {
    width: 18
  },
  typographyRoot: {
    width: '100%'
  },
});

export default SideMenuItemStyle;
