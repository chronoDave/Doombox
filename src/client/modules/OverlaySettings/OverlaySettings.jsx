import React, { useState, useEffect } from 'react';
import { cx } from 'emotion';
import { connect } from 'react-redux';
import Mousetrap from 'mousetrap';
import PropTypes from 'prop-types';

// Core
import {
  Overlay,
  ButtonIcon,
  ButtonBase,
  Typography
} from '../../components';

import { SettingsLanguage } from '../SettingsLanguage';
import { SettingsLibrary } from '../SettingsLibrary';
import { SettingsAppearance } from '../SettingsAppearance';

// Redux
import { setOverlay } from '../../redux';

// Hooks
import { useTranslation } from '../../hooks';

// Styles
import useOverlaySettingsStyles from './OverlaySettings.styles';

const OverlaySettings = ({ open, dispatchOverlay }) => {
  const [tab, setTab] = useState('general');

  const { t } = useTranslation();
  const classes = useOverlaySettingsStyles();

  useEffect(() => {
    Mousetrap.bind('esc', () => dispatchOverlay(null));

    return () => Mousetrap.unbind('esc');
  }, [dispatchOverlay]);

  const tabs = {
    general: <div />,
    appearance: <SettingsAppearance />,
    language: <SettingsLanguage />,
    library: <SettingsLibrary />
  };

  return (
    <Overlay open={open} className={classes.overlay}>
      <div className={classes.root}>
        <div className={classes.tabs}>
          {Object.keys(tabs).map(key => (
            <ButtonBase
              key={key}
              onClick={() => setTab(key)}
              className={cx(classes.tab, {
                [classes.tabActive]: tab === key,
                [classes.tabHover]: tab !== key
              })}
            >
              <Typography color="inherit">
                {t(`common.${key}`, { transform: 'capitalize' })}
              </Typography>
            </ButtonBase>
          ))}
        </div>
        <div className={classes.body}>
          {tabs[tab]}
        </div>
        <div className={classes.close}>
          <ButtonIcon small icon="close" onClick={() => dispatchOverlay(null)} />
          <Typography>
            Esc
          </Typography>
        </div>
      </div>
    </Overlay>
  );
};

const mapDispatchToProps = {
  dispatchOverlay: setOverlay
};

OverlaySettings.defaultProps = {
  open: false
};

OverlaySettings.propTypes = {
  open: PropTypes.bool,
  dispatchOverlay: PropTypes.func.isRequired
};

export default connect(
  null,
  mapDispatchToProps
)(OverlaySettings);