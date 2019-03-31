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
    width: theme.spacing.component.optionbar,
    height: '100%',
    backgroundColor: theme.palette.grey[600],
    boxShadow: theme.shadows[8]
  },
  typographyTitle: {
    paddingTop: theme.spacing.unit
  },
  listRoot: {
    width: '100%'
  },
  listItemRoot: {
    color: theme.palette.grey[50]
  },
  listItemAvatarRoot: {
    padding: 0
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: 500
  },
  listItemSecondaryActionTypography: {
    color: theme.palette.grey[200]
  }
});

export default MainDrawerStyle;
