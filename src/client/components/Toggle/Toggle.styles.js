import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    cursor: 'pointer',
    backgroundColor: theme.palette.grey[2],
    borderRadius: theme.spacing(),
    padding: theme.spacing(0.5),
    width: theme.mixins.toggle.body,
    outline: 0,
    flexShrink: 0,
    transition: theme.transitions.create(['background-color'])
  },
  active: {
    backgroundColor: theme.palette.primary
  },
  thumb: {
    backgroundColor: theme.palette.autoContrast(
      theme.palette.primary,
      theme.palette.grey[0],
      theme.palette.grey[6]
    ),
    borderRadius: '50%',
    width: theme.mixins.toggle.thumb,
    height: theme.mixins.toggle.thumb,
    transition: theme.transitions.create(['transform'])
  },
  thumbActive: {
    transform: `translateX(${theme.mixins.toggle.body - theme.mixins.toggle.thumb}px)`
  }
}), 'toggle');
