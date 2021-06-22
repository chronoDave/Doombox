import { useStyles } from '../../hooks';

export default () => useStyles('Window', {
  root: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    height: '100vh'
  },
  body: {
    minHeight: 0,
    overflow: 'auto'
  }
});
