import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// Core
import ButtonBase from '@material-ui/core/ButtonBase';
import Popover from '@material-ui/core/Popover';

class ButtonPopover extends Component {
  constructor() {
    super();

    this.state = {
      anchorEl: null,
      open: false
    };
  }

  handleClick = event => this.setState({ anchorEl: event.currentTarget, open: true })

  render() {
    const {
      children,
      popover,
      anchorOriginVertical,
      anchorOriginHorizontal,
      transformOriginVertical,
      transformOriginHorizontal,
      className
    } = this.props;
    const { anchorEl, open } = this.state;

    return (
      <Fragment>
        <ButtonBase
          onClick={this.handleClick}
          className={className}
        >
          {children}
        </ButtonBase>
        <Popover
          onClose={() => this.setState({ anchorEl: null, open: false })}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: anchorOriginVertical || 'bottom',
            horizontal: anchorOriginHorizontal || 'center'
          }}
          transformOrigin={{
            vertical: transformOriginVertical || 'top',
            horizontal: transformOriginHorizontal || 'center'
          }}
        >
          {popover}
        </Popover>
      </Fragment>
    );
  }
}

ButtonPopover.propTypes = {
  children: PropTypes.node.isRequired,
  popover: PropTypes.node.isRequired,
  anchorOriginVertical: PropTypes.oneOf(['top', 'center', 'bottom']),
  anchorOriginHorizontal: PropTypes.oneOf(['left', 'center', 'right']),
  transformOriginVertical: PropTypes.oneOf(['top', 'center', 'bottom']),
  transformOriginHorizontal: PropTypes.oneOf(['left', 'center', 'right']),
  className: PropTypes.string
};

export default ButtonPopover;
