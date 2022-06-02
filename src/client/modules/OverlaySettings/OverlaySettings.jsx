import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Mousetrap from 'mousetrap';
import PropTypes from 'prop-types';

import { cx } from '../../utils';
import { Overlay, ButtonIcon, ButtonBase } from '../../components';
import { setOverlay } from '../../redux';
import { useTranslation } from '../../hooks';

import SettingsLanguage from './components/SettingsLanguage';
import SettingsLibrary from './components/SettingsLibrary';
import SettingsAppearance from './components/SettingsAppearance';
import './OverlaySettings.scss';

const OverlaySettings = ({ open, dispatchOverlay }) => {
  const [tab, setTab] = useState('appearance');

  const { t } = useTranslation();

  useEffect(() => {
    Mousetrap.bind('esc', () => dispatchOverlay(null));

    return () => Mousetrap.unbind('esc');
  }, [dispatchOverlay]);

  const tabs = {
    appearance: <SettingsAppearance />,
    language: <SettingsLanguage />,
    library: <SettingsLibrary />
  };

  return (
    <Overlay open={open} className="OverlaySettings">
      <div className="overlay">
        <div className="tabs">
          {Object.keys(tabs).map(key => (
            <ButtonBase
              key={key}
              onClick={() => setTab(key)}
              className={cx(tab === key && 'active')}
            >
              {t(`common.${key}`, { transform: 'capitalize' })}
            </ButtonBase>
          ))}
        </div>
        <div className="body">{tabs[tab]}</div>
        <div className="close">
          <ButtonIcon small icon="close" onClick={() => dispatchOverlay(null)} />
          <p>Esc</p>
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
