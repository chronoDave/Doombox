import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    zIndex: theme.zIndex.popper,
    position: 'fixed'
  },
  arrow: {
    zIndex: -1,
  },
  arrowTop: {
    bottom: -4
  },
  arrowBottom: {
    top: -4
  },
  arrowLeft: {
    right: -4
  },
  arrowRight: {
    left: -4
  }
}), 'popperBase');
