import createStyles from '@material-ui/core/styles/createStyles';

const LabelViewStyle = theme => createStyles({
  root: {
    height: '100%',
    paddingLeft: theme.spacing.unit * 4
  },
  scrollbar: theme.scrollbar,
  icon: {
    color: theme.palette.grey[50]
  }
});

export default LabelViewStyle;
