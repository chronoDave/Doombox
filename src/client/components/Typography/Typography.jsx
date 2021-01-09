import { createElement, forwardRef } from 'react';
import { cx } from 'emotion';
import PropTypes from 'prop-types';

// Hooks
import { useTheme } from '../../hooks';

// Validation
import { propTypographyVariants } from '../../validation/propTypes';

// Styles
import useTypographyStyles from './Typography.styles';

const Typography = forwardRef((props, ref) => {
  const {
    element,
    variant,
    children,
    className,
    color,
    noWrap,
    fontWeight,
    align,
    clamp,
    style,
    ...rest
  } = props;

  const classes = useTypographyStyles();
  const theme = useTheme();

  const getElement = () => {
    if (element) return element;
    if (['body', 'subtitle', 'caption'].includes(variant)) return 'p';
    return variant;
  };

  const getColor = () => {
    if (color === 'inherit') return color;
    if (color === 'disabled') return theme.palette.text.disabled;
    if (color.includes('text')) return theme.palette.text[color.slice(4).toLowerCase()];
    return theme.palette[color];
  };

  const getClamp = () => {
    if (!clamp) return {};
    return ({
      display: '-webkit-box',
      WebkitLineClamp: typeof clamp === 'number' ?
        clamp :
        1,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    });
  };

  return (
    createElement(
      getElement(),
      {
        className: cx(
          classes[variant],
          classes.root,
          {
            [classes.noWrap]: noWrap
          },
          className
        ),
        style: {
          ...style,
          color: getColor(),
          textAlign: align,
          fontWeight,
          ...getClamp()
        },
        ...rest,
        ref
      },
      children
    )
  );
});

Typography.defaultProps = {
  element: null,
  children: null,
  align: 'left',
  color: 'textPrimary',
  variant: 'body',
  noWrap: false,
  className: null,
  fontWeight: 'initial',
  clamp: null,
  style: {}
};

Typography.propTypes = {
  element: PropTypes.string,
  align: PropTypes.oneOf([
    'left',
    'center',
    'right'
  ]),
  style: PropTypes.shape({}),
  variant: propTypographyVariants,
  color: PropTypes.oneOf([
    'inherit',
    'primary',
    'secondary',
    'textPrimary',
    'textSecondary',
    'disabled'
  ]),
  children: PropTypes.node,
  fontWeight: PropTypes.oneOf(['initial', 300, 400, 500]),
  className: PropTypes.string,
  noWrap: PropTypes.bool,
  clamp: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool
  ])
};

Typography.displayName = 'Typography';
export default Typography;
