import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    height: 4,
    backgroundColor: theme.palette.overlay(
      theme.palette.primary.main,
      theme.palette.opacity.hover
    ),
    width: '100%'
  },
  rootVertical: {
    width: 4,
    height: '100%',
    flexDirection: 'column-reverse'
  },
  track: ({ value = 0 }) => ({
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    width: `${value}%`
  }),
  trackVertical: ({ value = 0 }) => ({
    height: `${value}%`,
    width: '100%',
  }),
  thumb: {
    width: 8,
    height: 8,
    flexShrink: 0,
    borderRadius: '50%',
    marginTop: -2,
    zIndex: 100,
    backgroundColor: theme.palette.text.primary
  },
  thumbVertical: {
    marginTop: 0,
    marginLeft: -2
  }
}), 'slider');
