import { makeStyles } from '../../theme';

export default makeStyles(theme => {
  const getColor = color => {
    if (color === 'inherit') return color;
    if (color === 'disabled') return theme.palette.text.disabled;
    if (color.includes('text')) return theme.palette.text[color.slice(4).toLowerCase()];
    return theme.palette[color];
  };

  return ({
    variant: ({ variant }) => theme.typography[variant],
    root: ({
      align,
      fontWeight,
      color,
    }) => ({
      textAlign: align,
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
