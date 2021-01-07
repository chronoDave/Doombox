import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    zIndex: theme.zIndex.popper,
    position: 'fixed'
  }
}), 'popperBase');
