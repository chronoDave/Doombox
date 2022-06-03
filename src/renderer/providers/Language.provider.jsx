import React from 'react';
import { connect } from 'react-redux';
import { getTranslation, getNativeKeybind } from '@doombox-intl';
import PropTypes from 'prop-types';

// Context
import { LanguageContext } from '../context';

const LanguageProvider = props => {
  const { useLocalizedMetadata,
    language,
    children } = props;

  const t = (id, options) => getTranslation(language, id, options);
  const value = {
    language,
    getNativeKeybind,
    getLocalizedTag: (metadata, tag) => (useLocalizedMetadata ?
      (metadata[`${tag}localized`] || metadata[tag] || null) :
      metadata[tag] || null),
    t,
    // Use system locale
    formatDate: date => new Date(date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }),
    formatTime: (time, format = 'number') => {
      const h = Math.floor(time / 3600);
      const m = Math.floor((time % 3600) / 60);
      const s = Math.floor((time % 3600) % 60);

      switch (format) {
        case 'number':
          return [
            h > 0 && `${h}`.padStart(2, 0),
            `${m}`.padStart(2, 0),
            `${s}`.padStart(2, 0)
          ].filter(n => n).join(':');
        case 'text':
          return [
            h > 0 && `${h} ${t('time.hour_narrow')}`,
            `${m} ${t('time.minute_short')}`
          ].filter(n => n).join(' ');
        default:
          if (process.env.NODE_ENV === 'development') console.error(`Invalid format: \`${format}\``);
          return time;
      }
    }
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
  language: state.config.display.language
});

export default connect(
  mapStateToProps
)(LanguageProvider);
