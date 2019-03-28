import createStyles from '@material-ui/core/styles/createStyles';

const OptionbarStyle = theme => createStyles({
  root: {
    position: 'fixed',
    left: 0,
    top: 0,
    width: theme.spacing.component.optionbar,
    height: '100%',
    backgroundColor: theme.palette.grey[500]
  },
  gridContainerRoot: {
    paddingBottom: theme.spacing.component.playerControls
  }
});

export default OptionbarStyle;
