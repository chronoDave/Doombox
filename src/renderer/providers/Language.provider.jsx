import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { getTranslation, getNativeKeybind } from '@doombox-intl';
import { capitalize, pascalize } from '@doombox-utils';
import PropTypes from 'prop-types';

// Context
import { LanguageContext } from '../context';

const LanguageProvider = props => {
  const { useLocalizedMetadata, language, children } = props;

  /**
   * @param {object} options
   * @param {boolean} options.plural - Is value plural?
   * @param {string} options.transform - String transform
   * @param {boolean} options.dots - Should dots be appended to the string?
   * @param {object} options.mixins - Mixins
   */
  const t = (id, options) => {
    let value = getTranslation(language, id);
    // Plural
    if (Array.isArray(value)) value = value[options?.plural ? 1 : 0];

    // Mixins
    const templates = value.match(/({.[^}]*.)/g);
    if (templates && templates.length > 0) {
      for (let i = 0; i < templates.length; i += 1) {
        value = value.replace(templates[i], options?.mixins[templates[i].slice(1, -1)]);
      }
    }

    // Dots
    if (options?.dots) value = `${value}...`;

    // Transform
    if (options?.transform === 'uppercase') return value.toUpperCase();
    if (options?.transform === 'capitalize') return capitalize(value);
    if (options?.transform === 'pascal') return pascalize(value);
    return value;
  };

  const value = useMemo(() => ({
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
  }), [t, useLocalizedMetadata, language]);

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
