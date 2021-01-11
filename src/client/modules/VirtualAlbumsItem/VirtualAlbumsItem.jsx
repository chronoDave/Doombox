import React from 'react';
import PropTypes from 'prop-types';

// Core
import { ButtonBase, Typography, TablePair } from '../../components';

// Hooks
import { useMediaQuery } from '../../hooks';

// Validation
import { propVirtualStyle, propTablePairs } from '../../validation/propTypes';

// Styles
import useVirtualAlbumsItemStyles from './VirtualAlbumsItem.style';

const VirtualAlbumsItem = props => {
  const {
    cover,
    style,
    primary,
    secondary,
    details,
    onClick
  } = props;
  const classes = useVirtualAlbumsItemStyles();
  const isSm = useMediaQuery(({ join, create }) => join(
    create('minWidth', 'sm'),
    create('minHeight', 'sm')
  ));

  return (
    <div style={style} className={classes.root}>
      <ButtonBase onClick={onClick} className={classes.button}>
        <img
          src={cover}
          className={classes.cover}
          alt={`${secondary} - ${primary}`}
        />
      </ButtonBase>
      <div className={classes.label}>
        <Typography clamp={isSm ? 2 : 1}>
          {primary}
        </Typography>
        <Typography clamp color="textSecondary">
          {secondary}
        </Typography>
        {isSm && (
          <TablePair
            className={classes.details}
            variant="subtitle"
            values={details}
          />
        )}
      </div>
    </div>
  );
};

VirtualAlbumsItem.defaultProps = {
  cover: null,
};

VirtualAlbumsItem.propTypes = {
  cover: PropTypes.string,
  details: propTablePairs.isRequired,
  style: propVirtualStyle.isRequired,
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default VirtualAlbumsItem;
