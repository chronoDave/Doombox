import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Core
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

// Style
import GridStyle from './GridStyle';

class GridItem extends Component {
  render() {
    const {
      classes,
      className,
      children,
      fullHeight,
      ...rest
    } = this.props;

    return (
      <Grid
        item
        className={classNames(
          classes.root,
          fullHeight && classes.fullHeight,
          className
        )}
        {...rest}
      >
        {children}
      </Grid>
    );
  }
}

GridItem.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  fullHeight: PropTypes.bool,
  className: PropTypes.string,
};

export default withStyles(GridStyle)(GridItem);
