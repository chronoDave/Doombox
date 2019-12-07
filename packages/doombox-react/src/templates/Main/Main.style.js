export const MainStyles = theme => ({
  root: {
    position: 'fixed',
    left: theme.dimensions.sidebar,
    height: '100%',
    width: `calc(100% - ${theme.dimensions.sidebar}px)`,
    overflow: 'auto'
  }
});
