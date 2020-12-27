import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    cursor: 'pointer',
    backgroundColor: theme.palette.grey[3],
    borderRadius: theme.spacing(),
    padding: theme.spacing(0.5),
    width: theme.mixins.toggle.body,
    outline: 0,
    flexShrink: 0,
    transition: theme.transitions.create(
      ['background-color'],
      { duration: 'shortest' }
    )
  },
  active: {
    backgroundColor: theme.palette.primary.main
  },
  thumb: {
    backgroundColor: theme.palette.text.primary,
    borderRadius: '50%',
    width: theme.mixins.toggle.thumb,
    height: theme.mixins.toggle.thumb,
    transition: theme.transitions.create(
      ['transform'],
      { duration: 'shortest' }
    )
  },
  thumbActive: {
    transform: `translateX(${theme.mixins.toggle.body - theme.mixins.toggle.thumb}px)`
  }
}), 'toggle');
