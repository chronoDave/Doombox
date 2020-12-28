import { makeStyles } from '../../theme';

export default makeStyles(() => ({
  root: {
    flexGrow: 1,
    overflow: 'auto'
  },
  body: ({ height }) => ({
    position: 'relative',
    height
  })
}), 'virtualList');
