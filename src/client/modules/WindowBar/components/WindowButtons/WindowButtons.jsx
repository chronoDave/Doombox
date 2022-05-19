import React from 'react';

// Core
import { ButtonBase, Icon } from '../../../../components';

// Actions
import {
  windowClose,
  windowMaximize,
  windowMinimize
} from '../../../../actions';

import './WindowButtons.scss';

const WindowButtons = () => (
  <div className="WindowButtons">
    <ButtonBase onClick={windowMinimize}>
      <Icon type="minimize" small />
    </ButtonBase>
    <ButtonBase onClick={windowMaximize}>
      <Icon type="maximize" small />
    </ButtonBase>
    <ButtonBase
      className="close"
      onClick={windowClose}
    >
      <Icon type="close" small />
    </ButtonBase>
  </div>
);

export default WindowButtons;
