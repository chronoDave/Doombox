import createStyles from '@material-ui/core/styles/createStyles';

const MainStyle = theme => createStyles({
  root: {
    backgroundColor: theme.palette.grey[300],
    height: '100%'
  },
  gridContainerRoot: {
    height: '100%',
    paddingBottom: theme.spacing.component.playerControls,
    paddingLeft: theme.spacing.component.optionbar
  },
});

export default MainStyle;
