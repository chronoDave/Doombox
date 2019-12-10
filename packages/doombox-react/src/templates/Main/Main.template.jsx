import React, {
  Fragment,
  useMemo
} from 'react';
import PropTypes from 'prop-types';

// Modules
import { Sidebar } from '../../entities';

// Style
import { useMainStyles } from './Main.style';

const MainTemplate = ({ children }) => {
  const classes = useMainStyles();

  return (
    <Fragment>
      {useMemo(() => <Sidebar />, [])}
      <div className={classes.root}>
        {children}
      </div>
    </Fragment>
  );
};

MainTemplate.propTypes = {
  children: PropTypes.node.isRequired
};

export default MainTemplate;
