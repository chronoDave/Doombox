import { makeStyles } from '../../theme';

export default makeStyles(() => ({
  root: {
    outline: 0,
    cursor: 'pointer',
    border: 'none',
    backgroundColor: 'transparent',
    padding: 0
  },
  holding: {
    marginTop: 1,
    marginBottom: -1
  }
}), 'buttonBase');
