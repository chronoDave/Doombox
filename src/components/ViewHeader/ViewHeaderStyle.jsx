import createStyles from '@material-ui/core/styles/createStyles';

const ViewHeaderStyle = theme => createStyles({
  root: {
    padding: theme.spacing.unit,
    paddingTop: theme.spacing.unit * 8,
    height: 120,
    width: 'fit-content'
  },
});

export default ViewHeaderStyle;
