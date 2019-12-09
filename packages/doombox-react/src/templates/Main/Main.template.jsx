import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Modules
import { Sidebar } from '../../entities';

// Style
import { useMainStyles } from './Main.style';

const MainTemplate = ({ children }) => {
  const classes = useMainStyles();

  return (
    <Fragment>
      <Sidebar />
      <div className={classes.root}>
        {children}
      </div>
    </Fragment>
  );
};

MainTemplate.propTypes = {
  children: PropTypes.element.isRequired
};

export default MainTemplate;
