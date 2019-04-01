import createStyles from '@material-ui/core/styles/createStyles';

const DividerStyle = theme => createStyles({
  root: {
    width: '100%'
  },
  light: {
    backgroundColor: theme.palette.getAlpha(theme.palette.grey[50], 0.1)
  },
  padding: {
    margin: `${theme.spacing.unit}px 0`
  }
});

export default DividerStyle;
