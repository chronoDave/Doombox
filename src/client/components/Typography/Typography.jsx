import { createElement, forwardRef } from 'react';
import { cx } from 'emotion';
import PropTypes from 'prop-types';

// Validation
import { propTypographyVariants } from '../../validation/propTypes';

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

  const getElement = () => (['body', 'subtitle', 'caption'].includes(variant) ? 'p' : variant);

  return (
    createElement(getElement(), {
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
  variant: propTypographyVariants,
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
