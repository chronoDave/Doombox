import { makeStyles } from '../../theme';

export default makeStyles(() => ({
  root: {
    overflow: 'auto'
  },
  container: ({ height }) => ({
    position: 'relative',
    height
  })
}), 'virtualList');
