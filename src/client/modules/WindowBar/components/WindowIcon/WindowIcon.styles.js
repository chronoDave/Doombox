import { makeStyles } from '../../../../theme';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    WebkitAppRegion: 'drag'
  }
}), 'windowIcon');
