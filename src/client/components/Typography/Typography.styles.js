import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  h1: theme.typography.h1,
  h2: theme.typography.h2,
  h3: theme.typography.h3,
  h4: theme.typography.h4,
  h5: theme.typography.h5,
  h6: theme.typography.h6,
  body: theme.typography.body,
  subtitle: theme.typography.subtitle,
  caption: theme.typography.caption,
  align: ({ align }) => ({
    textAlign: align
  }),
  root: ({ fontWeight, color }) => ({
    color: color === 'inherit' ? color : theme.palette.text[color],
    fontWeight: fontWeight || 'initial',
    margin: 0
  }),
  clamp: ({ clamp }) => ({
    width: '100%',
    display: '-webkit-box',
    WebkitLineClamp: clamp,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  }),
  noWrap: {
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }
}), 'typography');
