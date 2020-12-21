import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: ({ orientation }) => {
    const root = {
      horizontal: {
        width: '100%',
        height: theme.mixins.slider.track
      },
      vertical: {
        width: theme.mixins.slider.track,
        height: '100%',
        flexDirection: 'column-reverse'
      }
    };

    return ({
      display: 'flex',
      ...root[orientation]
    });
  },
  trackActive: ({ orientation, value }) => {
    const track = {
      horizontal: {
        width: `${value}%`,
        height: '100%',
        justifyContent: 'flex-end'
      },
      vertical: {
        width: '100%',
        height: `${value}%`,
        justifyContent: 'flex-start',
        flexDirection: 'column'
      }
    };

    return ({
      display: 'flex',
      alignItems: 'center',
      backgroundColor: theme.palette.primary.main,
      flexShrink: 0,
      outline: 0,
      ...track[orientation]
    });
  },
  trackInactive: {
    width: '100%',
    height: '100%',
    outline: 0,
    backgroundColor: theme.palette.overlay(
      theme.palette.primary.main,
      theme.palette.opacity.inactive
    )
  },
  thumb: ({ orientation, value }) => {
    const thumb = {
      horizontal: {
        left: `${theme.mixins.slider.thumb * (1 - (value / 100))}px`,
      },
      vertical: {
        bottom: `${theme.mixins.slider.thumb * (1 - (value / 100))}px`,
      }
    };

    return ({
      position: 'relative',
      width: theme.mixins.slider.thumb,
      height: theme.mixins.slider.thumb,
      flexShrink: 0,
      borderRadius: '50%',
      backgroundColor: theme.palette.text.primary,
      outline: 0,
      ...thumb[orientation]
    });
  }
}), 'slider');
