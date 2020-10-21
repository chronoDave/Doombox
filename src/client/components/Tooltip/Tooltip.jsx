import React, {
  Children,
  Fragment,
  useState,
  useRef,
  cloneElement
} from 'react';
import PropTypes from 'prop-types';

// Core
import {
  Fade,
  Paper,
  Popper,
  withStyles
} from '@material-ui/core';

import { Typography } from '../Typography';

// Hooks
import { useHover } from '../../hooks';

// Styles
import { tooltipStyles } from './Tooltip.styles';

const Tooltip = props => {
  const {
    primary,
    disabled,
    classes,
    children
  } = props;
  const [open, setOpen] = useState(false);

  const ref = useRef(null);
  const { onEnter, onLeave } = useHover({
    enter: () => setOpen(true),
    leave: () => setOpen(false)
  });

  return (
    <Fragment>
      {Children.only(cloneElement(children, {
        onMouseEnter: onEnter,
        onMouseLeave: onLeave,
        ref
      }))}
      <Popper
        anchorEl={ref.current}
        open={disabled ? false : open}
        transition
        placement="top"
        modifiers={{
          preventOverflow: {
            enabled: true,
            boundariesElement: 'scrollParent',
          }
        }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Paper classes={{ root: classes.paperRoot }}>
              <Typography variant="caption">
                {primary}
              </Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
    </Fragment>
  );
};

Tooltip.defaultProps = {
  disabled: false
};

Tooltip.propTypes = {
  primary: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  classes: PropTypes.shape({
    paperRoot: PropTypes.string.isRequired
  }).isRequired,
  children: PropTypes.element.isRequired
};

export default withStyles(tooltipStyles, { name: 'Tooltip' })(Tooltip);
