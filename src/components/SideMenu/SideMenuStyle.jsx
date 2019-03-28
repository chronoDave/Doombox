const SideMenuContainerStyle = theme => ({
  root: {
    width: '50%',
    maxWidth: 420,
    backgroundColor: theme.palette.grey[400]
  },
  scrollbar: theme.scrollbar,
  listItemTextPrimary: {
    fontWeight: 500
  },
  listItemHeader: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px`
  }
});

export default SideMenuContainerStyle;
