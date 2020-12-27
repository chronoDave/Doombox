import { makeStyles } from '../../theme';

export default makeStyles(() => ({
  root: {
    overflow: 'auto'
  },
  body: ({ height }) => ({
    position: 'relative',
    height
  })
}), 'virtualList');
