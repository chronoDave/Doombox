import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';

// Assets
import iconDark from '../../../../assets/icon_dark.png';
import iconLight from '../../../../assets/icon_light.png';

// Styles
import { useAppStyles } from '../App.styles';

const AppIcon = ({ variant }) => {
  const classes = useAppStyles();

  return (
    <div className={clsx(classes.barIcon, classes.drag)}>
      <img
        src={variant === 'dark' ? iconDark : iconLight}
        alt="Doombox icon"
      />
    </div>
  );
};

AppIcon.propTypes = {
  variant: PropTypes.oneOf(['dark', 'light']).isRequired
};

const mapStateToProps = state => ({
  variant: state.ipc.theme.variant,
});

export default connect(
  mapStateToProps
)(AppIcon);
