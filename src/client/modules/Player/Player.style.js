import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  cover: ({ cover = {} }) => ({
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: cover.file && theme.createImage(cover.file),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: 150,
    width: 150,
    padding: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      width: 210,
      height: 210
    },
    [theme.breakpoints.up('md')]: {
      width: 300,
      height: 300
    }
  }),
  coverTitle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1
  },
  duration: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}), 'player');
