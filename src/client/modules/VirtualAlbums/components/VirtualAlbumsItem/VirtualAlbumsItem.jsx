import React from 'react';
import PropTypes from 'prop-types';

// Core
import { ButtonBase, TablePair } from '../../../../components';

// Validation
import { propVirtualStyle, propTablePairs } from '../../../../validation/propTypes';

import './VirtualAlbumsItem.scss';

const VirtualAlbumsItem = props => {
  const {
    cover,
    style,
    primary,
    secondary,
    details,
    ...rest
  } = props;

  return (
    <div style={style} className="VirtualAlbumsItem">
      <ButtonBase {...rest}>
        <img src={cover} alt={`${secondary} - ${primary}`} />
      </ButtonBase>
      <div className="label">
        <p className="primary">{primary}</p>
        <p className="secondary">{secondary}</p>
        <TablePair variant="subtitle" values={details} />
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
  secondary: PropTypes.string.isRequired
};

export default VirtualAlbumsItem;
