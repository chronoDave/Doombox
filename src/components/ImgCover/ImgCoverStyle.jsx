import createStyles from '@material-ui/core/styles/createStyles';

const ImgCoverStyle = theme => createStyles({
  root: {
    width: 150,
    height: 150
  },
  small: {
    width: theme.spacing.component.playerControls - theme.spacing.unit * 2,
    height: theme.spacing.component.playerControls - theme.spacing.unit * 2,
    padding: theme.spacing.unit
  },
  big: {
    width: '100%',
    height: '100%'
  }
});

export default ImgCoverStyle;
