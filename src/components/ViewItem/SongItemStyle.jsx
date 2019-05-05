import createStyles from '@material-ui/core/styles/createStyles';

const SongItemStyle = theme => createStyles({
  active: {
    backgroundColor: `${theme.palette.primary.main} !important`
  },
  duration: {
    maxWidth: 60
  },
  white: {
    color: theme.palette.grey[50]
  }
});

export default SongItemStyle;
