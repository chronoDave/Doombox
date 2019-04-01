import createStyles from '@material-ui/core/styles/createStyles';

const AlbumItemStyle = theme => createStyles({
  root: {
    padding: theme.spacing.unit,
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.grey[500]
  },
  active: {
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.grey[0]} !important`
  },
  typographyRoot: {
    maxHeight: '3em',
    overflow: 'hidden'
  },
  buttonBaseRoot: {
    paddingBottom: theme.spacing.unit / 2
  }
});

export default AlbumItemStyle;
