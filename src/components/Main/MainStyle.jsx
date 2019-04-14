import createStyles from '@material-ui/core/styles/createStyles';

const MainStyle = theme => createStyles({
  root: {
    backgroundColor: theme.palette.grey[500],
    height: '100%'
  },
  gridContainerRoot: {
    height: '100%',
    paddingLeft: theme.spacing.component.mainDrawer,
  },
});

export default MainStyle;
