import React from 'react';
import PropTypes from 'prop-types';

import './LabelSelect.scss';

const InputLabel = props => {
  const { label,
    description,
    children } = props;

  return (
    <div className="LabelSelect">
      <p className="label subtitle">{label}</p>
      {children}
      {description && <p>{description}</p>}
    </div>
  );
};

InputLabel.defaultProps = {
  description: null
};

InputLabel.propTypes = {
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default InputLabel;
