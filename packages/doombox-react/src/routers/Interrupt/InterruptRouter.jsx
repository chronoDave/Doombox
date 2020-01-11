import React from 'react';
import PropTypes from 'prop-types';
import {
  ACTION,
  TYPE
} from '@doombox/utils';

// Core
import { Container } from '@material-ui/core';

import { ModalFade } from '../../components';

// Pages
import {
  InterruptScanningPage,
  InterruptErrorPage
} from '../../pages';

// Hooks
import { useIpc } from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

// Style
import { useInterruptRouterStyles } from './InterruptRouter.style';

const InterruptRouter = ({ open, onClose }) => {
  const classes = useInterruptRouterStyles();
  const { status, type } = useIpc(HOOK.IPC.INTERRUPT);

  const renderPage = () => {
    if (status === ACTION.INTERRUPT.PENDING) {
      switch (type) {
        case TYPE.IPC.LIBRARY: return <InterruptScanningPage />;
        default: return null;
      }
    }
    if (status === ACTION.INTERRUPT.ERROR) return <InterruptErrorPage />;
    return null;
  };

  return (
    <ModalFade open={open} onClose={onClose}>
      <Container maxWidth="sm" classes={{ root: classes.container }}>
        {renderPage()}
      </Container>
    </ModalFade>
  );
};

InterruptRouter.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default InterruptRouter;
