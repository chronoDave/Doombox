import { Children, cloneElement } from 'react';
import { cx } from 'emotion';
import PropTypes from 'prop-types';

// Styles
import useHiddenStyles from './Hidden.styles';

const Hidden = props => {
  const {
    smDown,
    smUp,
    mdDown,
    mdUp,
    lgDown,
    lgUp,
    children
  } = props;
  const classes = useHiddenStyles();

  return Children.map(children, child => cloneElement(child, {
    className: cx(child.props.className, {
      [classes.smDown]: smDown,
      [classes.smUp]: smUp,
      [classes.mdDown]: mdDown,
      [classes.mdUp]: mdUp,
      [classes.lgDown]: lgDown,
      [classes.lgUp]: lgUp
    })
  }));
};

Hidden.defaultProps = {
  smDown: false,
  smUp: false,
  mdDown: false,
  mdUp: false,
  lgDown: false,
  lgUp: false
};

Hidden.propTypes = {
  smDown: PropTypes.bool,
  smUp: PropTypes.bool,
  mdDown: PropTypes.bool,
  mdUp: PropTypes.bool,
  lgDown: PropTypes.bool,
  lgUp: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Hidden;
