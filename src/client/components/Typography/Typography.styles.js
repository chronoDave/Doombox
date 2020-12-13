import { makeStyles } from '../../theme';

export default makeStyles(theme => {
  const getColor = color => {
    if (color === 'inherit') return color;
    if (color === 'disabled') return theme.palette.text.disabled;
    if (color.includes('text')) return theme.palette.text[color.slice(4).toLowerCase()];
    return theme.palette[color].contrastText;
  };

  return ({
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
      color: getColor(color),
      fontWeight: fontWeight || 'initial',
      margin: 0
    }),
    clamp: ({ clamp }) => ({
      display: '-webkit-box',
      WebkitLineClamp: typeof clamp === 'number' ? clamp : 1,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    }),
    noWrap: {
      minWidth: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }
  });
}, 'typography');
