import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    zIndex: theme.zIndex.popper,
    position: 'fixed'
  },
  arrow: ({ placement }) => {
    const offset = {
      top: { bottom: -4 },
      bottom: { top: -4 },
      left: { right: -4 },
      right: { left: -4 }
    };

    return ({
      zIndex: -1,
      ...offset[placement.split('-')[0]]
    });
  }
}), 'popperBase');
