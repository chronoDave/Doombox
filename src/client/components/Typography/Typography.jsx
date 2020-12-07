import { createElement, forwardRef } from 'react';
import { cx } from 'emotion';
import PropTypes from 'prop-types';

// Styles
import useTypographyStyles from './Typography.styles';

const Typography = forwardRef((props, ref) => {
  const {
    variant,
    children,
    className,
    color,
    noWrap,
    fontWeight,
    align,
    clamp,
    ...rest
  } = props;
  const classes = useTypographyStyles({
    clamp,
    align,
    color,
    fontWeight
  });

  const element = (() => ([
    'body',
    'subtitle',
    'caption'
  ].includes(variant) ? 'p' : variant))();

  return (
    createElement(element, {
      className: cx(classes.root, {
        [classes[variant]]: variant,
        [classes.clamp]: clamp,
        [classes.noWrap]: noWrap,
        [classes.align]: align,
      }, className),
      ...rest,
      ref
    }, children)
  );
});

Typography.propTypes = {
  align: PropTypes.oneOf([
    'left',
    'center',
    'right'
  ]),
  variant: PropTypes.oneOf([
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'body',
    'subtitle',
    'caption'
  ]),
  color: PropTypes.oneOf([
    'inherit',
    'text',
    'primary',
    'secondary'
  ]),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  fontWeight: PropTypes.oneOf([300, 400, 500]),
  className: PropTypes.string,
  noWrap: PropTypes.bool,
  clamp: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool
  ])
};

Typography.defaultProps = {
  align: 'left',
  color: 'text',
  variant: 'body',
  noWrap: false,
  className: null,
  fontWeight: null,
  clamp: null
};

export default Typography;
