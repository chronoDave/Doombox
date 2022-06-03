import React from 'react';
import PropTypes from 'prop-types';

import './LabelToggle.scss';

const LabelToggle = props => {
  const {
    label,
    description,
    children,
    ...rest
  } = props;

  return (
    <div className="LabelToggle" {...rest}>
      <div className="text">
        <p className="subtitle">
          {label}
        </p>
        {description && (
          <p className="description subtitle" color="textSecondary">
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
};

LabelToggle.defaultProps = {
  description: null
};

LabelToggle.propTypes = {
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default LabelToggle;
