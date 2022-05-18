import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { TYPES } from '@doombox-utils/types';
import PropTypes from 'prop-types';

// Core
import {
  LabelToggle,
  SelectLanguage,
  Toggle
} from '../../../components';

// Actions
import { updateConfig } from '../../../actions';

// Hooks
import { useTranslation } from '../../../hooks';

const SettingsLanguage = ({ useLocalizedMetadata }) => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <SelectLanguage />
      <LabelToggle label={t('title.use_localized_metadata', { transform: 'capitalize' })}>
        <Toggle
          value={useLocalizedMetadata}
          onClick={() => updateConfig(TYPES.CONFIG.DISPLAY, { useLocalizedMetadata: !useLocalizedMetadata })}
        />
      </LabelToggle>
    </Fragment>
  );
};

SettingsLanguage.propTypes = {
  useLocalizedMetadata: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  useLocalizedMetadata: state.config.display.useLocalizedMetadata
});

export default connect(
  mapStateToProps
)(SettingsLanguage);
