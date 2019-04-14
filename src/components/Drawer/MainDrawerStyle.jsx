import createStyles from '@material-ui/core/styles/createStyles';

const MainDrawerStyle = theme => createStyles({
  listSubheaderRoot: {
    paddingTop: theme.spacing.unit * 2
  },
  listItemDivider: {
    borderColor: theme.palette.grey[50]
  },
  root: {
    position: 'fixed',
    left: 0,
    top: 0,
    width: theme.spacing.component.mainDrawer,
    overflowY: 'auto',
    overflowX: 'hidden',
    height: '100%',
    backgroundColor: theme.palette.grey[600],
    boxShadow: theme.shadows[8]
  },
  scrollbar: theme.scrollbar,
  typographyTitle: {
    paddingTop: theme.spacing.unit
  }
});

export default MainDrawerStyle;
