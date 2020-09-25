import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Hooks
import { LanguageContext } from '../hooks';

// Types
import { TYPES } from '../../../doombox-types';
import { getTranslation } from '../../../doombox-intl';

const LanguageProvider = ({ language, children }) => {
  const value = {
    language,
    t: id => getTranslation(language, id)
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  language: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

const mapStateToProps = state => ({
  language: state.config[TYPES.CONFIG.LANGUAGE]
});

export default connect(
  mapStateToProps
)(LanguageProvider);
