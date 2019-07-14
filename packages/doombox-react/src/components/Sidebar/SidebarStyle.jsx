const SidebarStyle = theme => ({
  paper: {
    width: theme.component.sidebar,
    backgroundColor: theme.palette.grey[400],
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    position: 'fixed',
    bottom: 0,
    height: 60,
    width: theme.component.sidebar,
  }
});

export default SidebarStyle;
