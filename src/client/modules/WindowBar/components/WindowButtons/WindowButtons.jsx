import React from 'react';
import { cx } from 'emotion';

// Core
import { ButtonBase, Icon } from '../../../../components';

// Actions
import {
  windowClose,
  windowMaximize,
  windowMinimize
} from '../../../../actions';

// Styles
import useWindowButtonsStyles from './WindowButtons.styles';

const WindowButtons = () => {
  const classes = useWindowButtonsStyles();

  return (
    <div className={classes.root}>
      <ButtonBase
        className={classes.button}
        onClick={windowMinimize}
      >
        <Icon type="minimize" small />
      </ButtonBase>
      <ButtonBase
        className={classes.button}
        onClick={windowMaximize}
      >
        <Icon type="maximize" small />
      </ButtonBase>
      <ButtonBase
        className={cx(classes.button, classes.close)}
        onClick={windowClose}
      >
        <Icon type="close" small />
      </ButtonBase>
    </div>
  );
};

export default WindowButtons;
