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
  Typography,
  SelectLanguage
} from '../../components';

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

  return (
    <Overlay open={open} className={classes.overlay}>
      <div className={classes.root}>
        <div className={classes.tabs}>
          <ButtonBase
            onClick={() => setTab('general')}
            className={cx(classes.button, {
              [classes.buttonActive]: tab === 'general'
            })}
          >
            <Typography color="inherit">
              {t('common.general', { transform: 'capitalize' })}
            </Typography>
          </ButtonBase>
          <ButtonBase
            onClick={() => setTab('library')}
            className={cx(classes.button, {
              [classes.buttonActive]: tab === 'library'
            })}
          >
            <Typography color="inherit">
              {t('common.library', { transform: 'capitalize' })}
            </Typography>
          </ButtonBase>
        </div>
        <div className={classes.body}>
          <SelectLanguage />
        </div>
        <div className={classes.close}>
          <ButtonIcon icon="close" onClick={() => dispatchOverlay(null)} />
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
