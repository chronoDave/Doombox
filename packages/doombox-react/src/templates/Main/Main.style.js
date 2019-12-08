export const MainStyles = theme => ({
  root: {
    position: 'fixed',
    left: theme.dimensions.sidebar.tab + theme.dimensions.sidebar.panel,
    height: '100%',
    width: `calc(100% - ${theme.dimensions.sidebar.tab + theme.dimensions.sidebar.panel}px)`,
    overflow: 'auto'
  }
});
