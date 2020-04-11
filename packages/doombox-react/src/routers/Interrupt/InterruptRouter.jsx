import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  ACTION,
  TYPE
} from '@doombox/utils';

// Core
import { Container } from '@material-ui/core';

// Pages
import {
  InterruptScanningPage,
  InterruptErrorPage
} from '../../pages';

// Style
import { useInterruptRouterStyles } from './InterruptRouter.style';

const InterruptRouter = props => {
  const {
    interrupt: {
      type,
      status
    }
  } = props;
  const classes = useInterruptRouterStyles();

  const renderPage = () => {
    if (status === ACTION.STATUS.PENDING) {
      switch (type) {
        case TYPE.IPC.LIBRARY: return <InterruptScanningPage />;
        default: return null;
      }
    }
    if (status === ACTION.STATUS.ERROR) return <InterruptErrorPage />;
    return null;
  };

  return (
    <Container maxWidth="sm" classes={{ root: classes.container }}>
      {renderPage()}
    </Container>
  );
};

InterruptRouter.propTypes = {
  interrupt: PropTypes.shape({
    status: PropTypes.string,
    type: PropTypes.string
  })
};

InterruptRouter.defaultProps = {
  interrupt: {}
};

const mapStateToProps = state => ({
  interrupt: state.interrupt
});

export default connect(
  mapStateToProps
)(InterruptRouter);
