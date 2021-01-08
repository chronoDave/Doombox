import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IPC } from '@doombox-utils/types';
import { cx } from 'emotion';
import PropTypes from 'prop-types';

// Core
import {
  ButtonBase,
  VirtualList,
  ButtonIcon,
  Typography
} from '../../components';

// Actions
import { ipcFind } from '../../actions';

// Redux
import {
  populateSearchLabels,
  populateSearchAlbums,
  populateSearchSongs
} from '../../redux';

// Hooks
import { useTranslation, useAudio } from '../../hooks';

// Theme
import { mixins } from '../../theme';

// Validation
import {
  propConfigSearch,
  propSong,
  propAlbum,
  propLabel
} from '../../validation/propTypes';

// Styles
import useViewSearchStyles from './ViewSearch.styles';

const ViewSearch = props => {
  const {
    query,
    params,
    songList,
    albumList,
    labelList
  } = props;
  const [tab, setTab] = useState('song');
  const classes = useViewSearchStyles();

  const { create, set } = useAudio();
  const { getLocalizedTag } = useTranslation();

  useEffect(() => {
    if (query && query !== '') {
      const createQuery = keys => keys
        .filter(key => params[key])
        .map(key => ({ $stringLoose: { [key]: query.toString() } }));

      const querySongs = createQuery(['artist', 'title']);
      const queryAlbums = createQuery(['album', 'albumartist', 'cdid']);
      const queryLabels = createQuery(['publisher']);

      if (querySongs.length > 0) ipcFind(IPC.CHANNEL.SONG, { $some: querySongs });
      if (queryAlbums.length > 0) ipcFind(IPC.CHANNEL.ALBUM, { $some: queryAlbums });
      if (queryLabels.length > 0) ipcFind(IPC.CHANNEL.LABEL, { $some: queryLabels });
    }
  }, [query, params]);

  const tabs = {
    song: {
      icon: 'artist',
      items: songList
    },
    album: {
      icon: 'minidisc',
      items: albumList
    },
    label: {
      icon: 'record',
      items: labelList
    }
  };

  const getLabel = metadata => {
    switch (tab) {
      case 'song':
        return ({
          primary: getLocalizedTag(metadata, 'title'),
          secondary: getLocalizedTag(metadata, 'artist')
        });
      case 'album':
        return ({
          primary: getLocalizedTag(metadata, 'album'),
          secondary: getLocalizedTag(metadata, 'albumartist')
        });
      case 'label':
        return ({
          primary: getLocalizedTag(metadata, 'publisher')
        });
      default:
        throw new Error(`Invalid tab: ${tab}`);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.icons}>
        {Object.entries(tabs).map(([key, { icon }]) => (
          <ButtonIcon
            key={icon}
            icon={icon}
            small
            className={cx(classes.icon, { [classes.active]: key === tab })}
            disabled={tabs[key].items.length <= 0}
            onClick={() => setTab(key)}
          />
        ))}
      </div>
      <VirtualList
        size={tabs[tab].items.length}
        itemSize={(tab === 'label' ?
          mixins.search.item / 2 :
          mixins.search.item
        )}
      >
        {({ style, index }) => {
          const item = tabs[tab].items[index];

          if (!item) return null;

          const { _id, primary, secondary } = getLabel(item);

          return (
            <ButtonBase
              style={style}
              key={_id}
              className={classes.item}
              onClick={() => {
                if (tab === 'song') {
                  create(item);
                } else {
                  set({
                    name: item.primary,
                    collection: item.songs
                  });
                }
              }}
            >
              <Typography clamp>
                {primary}
              </Typography>
              {secondary && (
                <Typography clamp color="textSecondary">
                  {secondary}
                </Typography>
              )}
            </ButtonBase>
          );
        }}
      </VirtualList>
    </div>
  );
};

ViewSearch.propTypes = {
  query: PropTypes.string.isRequired,
  params: propConfigSearch.isRequired,
  songList: PropTypes.arrayOf(propSong).isRequired,
  albumList: PropTypes.arrayOf(propAlbum).isRequired,
  labelList: PropTypes.arrayOf(propLabel).isRequired,
};

const mapStateToProps = state => ({
  query: state.search.query,
  params: state.config.search,
  songList: populateSearchSongs(state),
  albumList: populateSearchAlbums(state),
  labelList: populateSearchLabels(state)
});

export default connect(
  mapStateToProps
)(ViewSearch);
