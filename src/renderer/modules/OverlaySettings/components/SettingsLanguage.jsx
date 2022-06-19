import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { TYPES } from '../../../../utils/types';
import { LabelToggle, SelectLanguage, Toggle } from '../../../components';
import { updateConfig } from '../../../actions';
import { useTranslation } from '../../../hooks';

const SettingsLanguage = ({ useLocalizedMetadata }) => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <SelectLanguage />
      <LabelToggle label={t('title.use_localized_metadata', { transform: 'capitalize' })}>
        <Toggle
          value={useLocalizedMetadata}
          onClick={() => updateConfig(TYPES.CONFIG.DISPLAY, {
            useLocalizedMetadata: !useLocalizedMetadata
          })}
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
