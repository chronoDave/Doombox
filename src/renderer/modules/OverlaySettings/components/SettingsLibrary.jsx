import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { TYPES, TAGS } from '../../../../types';
import {
  LabelToggle,
  Toggle,
  LabelSelect,
  Select
} from '../../../components';
import { updateConfig } from '../../../actions';
import { useTranslation } from '../../../hooks';

const SettingsLibrary = props => {
  const { strict,
    skipCovers,
    tagType } = props;

  const { t } = useTranslation();

  return (
    <Fragment>
      <LabelSelect label={t('title.tag_type', { transform: 'capitalize' })}>
        <Select
          active={tagType}
          values={TAGS.reduce((acc, tag) => ({
            ...acc,
            [tag]: { primary: tag }
          }), {})}
          onChange={(_, key) => updateConfig(TYPES.CONFIG.PARSER, { tagType: key })}
        />
      </LabelSelect>
      <LabelToggle
        label={t('title.parser_strict', { transform: 'capitalize' })}
        description={t('description.parser_strict', { transform: 'capitalize' })}
      >
        <Toggle
          value={strict}
          onClick={() => updateConfig(TYPES.CONFIG.PARSER, { strict: !strict })}
        />
      </LabelToggle>
      <LabelToggle label={t('title.skip_covers', { transform: 'capitalize' })}>
        <Toggle
          value={skipCovers}
          onClick={() => updateConfig(TYPES.CONFIG.PARSER, { skipCovers: !skipCovers })}
        />
      </LabelToggle>
    </Fragment>
  );
};

SettingsLibrary.propTypes = {
  skipCovers: PropTypes.bool.isRequired,
  strict: PropTypes.bool.isRequired,
  tagType: PropTypes.oneOf(TAGS).isRequired
};

const mapStateToProps = state => ({
  skipCovers: state.config.parser.skipCovers,
  strict: state.config.parser.strict,
  tagType: state.config.parser.tagType
});

export default connect(
  mapStateToProps
)(SettingsLibrary);
