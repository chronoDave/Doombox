export const SidebarStyles = theme => ({
  root: {
    position: 'fixed',
    display: 'flex',
    width: theme.dimensions.sidebar.tab + theme.dimensions.sidebar.panel,
    height: `calc(100% - ${theme.dimensions.appBar}px)`
  }
});
