import createStyles from '@material-ui/core/styles/createStyles';

const LabelViewStyle = theme => createStyles({
  root: {
    height: '100%',
    paddingLeft: theme.spacing.unit * 4
  },
  scrollbar: theme.scrollbar
});

export default LabelViewStyle;
