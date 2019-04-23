import createStyles from '@material-ui/core/styles/createStyles';

const ImgStyle = theme => createStyles({
  root: {
    width: '100%',
    height: '100%'
  },
  playlistItem: {
    width: 300,
    height: 300
  },
  labelItem: {
    width: 120,
    height: 120
  },
  playerController: {
    width: 60,
    height: 60
  }
});

export default ImgStyle;
