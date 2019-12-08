export const SidebarStyles = theme => ({
  root: {
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: theme.dimensions.sidebar,
    height: '100%',
    backgroundColor: theme.palette.grey[100]
  }
});
