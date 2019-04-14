import createStyles from '@material-ui/core/styles/createStyles';

const AlbumItemStyle = theme => createStyles({
  root: {
    margin: `0 ${theme.spacing.unit}px`,
    backgroundColor: theme.palette.grey[500],
    height: '100%',
    maxHeight: 300 - theme.spacing.unit,
    boxShadow: theme.shadows[3]
  },
  icon: {
    color: theme.palette.grey[50]
  },
  imageContainer: {
    padding: theme.spacing.unit
  },
  textContainer: {
    padding: `0 ${theme.spacing.unit * 2}px`
  },
  active: {
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.grey[0]} !important`
  }
});

export default AlbumItemStyle;
