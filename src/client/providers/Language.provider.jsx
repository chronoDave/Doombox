import React from 'react';
import { connect } from 'react-redux';
import { getTranslation, getNativeKeybind } from '@doombox-intl';
import PropTypes from 'prop-types';

// Context
import { LanguageContext } from '../context';

const LanguageProvider = props => {
  const {
    useLocalizedMetadata,
    language,
    children
  } = props;

  const value = {
    language,
    getNativeKeybind,
    getLocalizedTag: (metadata, tag) => (useLocalizedMetadata ?
      (metadata[`${tag}localized`] || metadata[tag] || null) :
      metadata[tag] || null),
    t: (id, options) => getTranslation(language, id, options)
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  useLocalizedMetadata: PropTypes.bool.isRequired,
  language: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

const mapStateToProps = state => ({
  useLocalizedMetadata: state.config.display.useLocalizedMetadata,
  language: state.config.language
});

export default connect(
  mapStateToProps
)(LanguageProvider);
