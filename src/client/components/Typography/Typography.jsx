import { createElement, forwardRef } from 'react';
import { cx } from 'emotion';
import PropTypes from 'prop-types';

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
    ...rest
  } = props;

  const classes = useTypographyStyles({
    variant,
    clamp,
    align,
    color,
    fontWeight
  });

  const getElement = () => (
    ['body', 'subtitle', 'caption']
      .includes(variant) ? 'p' : variant
  );

  return (
    createElement(
      element || getElement(),
      {
        className: cx(
          classes.variant,
          classes.root,
          {
            [classes.clamp]: clamp,
            [classes.noWrap]: noWrap
          }, className
        ),
        ...rest,
        ref
      },
      children
    )
  );
});

Typography.defaultProps = {
  element: null,
  children: null
};

Typography.propTypes = {
  element: PropTypes.string,
  align: PropTypes.oneOf([
    'left',
    'center',
    'right'
  ]),
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
  color: 'textPrimary',
  variant: 'body',
  noWrap: false,
  className: null,
  fontWeight: null,
  clamp: null
};

Typography.displayName = 'Typography';
export default Typography;
