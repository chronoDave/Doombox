import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setAppTitle } from '../../../../actions';
import { useTranslation } from '../../../../hooks';

import './WindowTitle.scss';

const WindowTitle = ({ metadata }) => {
  const [title, setTitle] = useState('Doombox');
  const { getLocalizedTag } = useTranslation();

  useEffect(() => {
    if (metadata.artist || metadata.title || metadata.album) {
      const localizedTags = ['artist', 'title', 'album']
        .reduce((acc, cur) => ({
          ...acc,
          [cur]: getLocalizedTag(metadata, cur) || 'Unknown'
        }), {});
      const newTitle = `${localizedTags.artist} - ${localizedTags.title} (${localizedTags.album})`;

      setAppTitle(newTitle);
      setTitle(newTitle);
    }
  }, [metadata, getLocalizedTag]);

  return (
    <div className="WindowTitle">
      <p className="nowrap">{title}</p>
    </div>
  );
};

WindowTitle.defaultProps = {
  metadata: {}
};

WindowTitle.propTypes = {
  metadata: PropTypes.shape({
    title: PropTypes.string,
    titlelocalized: PropTypes.string,
    artist: PropTypes.string,
    artistlocalized: PropTypes.string,
    album: PropTypes.string,
    albumlocalized: PropTypes.string
  })
};

const mapStateToProps = state => ({
  metadata: {
    title: state.player.metadata.title,
    titlelocalized: state.player.metadata.titlelocalized,
    artist: state.player.metadata.artist,
    artistlocalized: state.player.metadata.artistlocalized,
    album: state.player.metadata.album,
    albumlocalized: state.player.metadata.albumlocalized
  }
});

export default connect(
  mapStateToProps
)(WindowTitle);
