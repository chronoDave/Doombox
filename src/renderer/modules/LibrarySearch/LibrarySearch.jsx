import React from 'react';
import { TYPES, WINDOW } from '@doombox-utils/types';
import { connect } from 'react-redux';

import { cx } from '../../utils';
import { ButtonIcon } from '../../components';
import { VirtualSongs, VirtualAlbums, VirtualLabels } from '..';
import { updateCache } from '../../actions';
import { propTabSearch } from '../../validation/propTypes';

import './LibrarySearch.scss';

const LibrarySearch = ({ tab }) => {
  const tabs = {
    [WINDOW.TABS.SONGS]: {
      icon: 'artist',
      component: <VirtualSongs />
    },
    [WINDOW.TABS.ALBUMS]: {
      icon: 'minidisc',
      component: <VirtualAlbums />
    },
    [WINDOW.TABS.LABELS]: {
      icon: 'record',
      component: <VirtualLabels />
    }
  };

  return (
    <div className="LibrarySearch">
      <div className="icons">
        {Object.entries(tabs).map(([key, { icon }]) => (
          <ButtonIcon
            key={key}
            icon={icon}
            small
            className={cx(key === tab && 'active')}
            onClick={() => {
              updateCache(TYPES.CACHE.TABS, { search: key });
            }}
          />
        ))}
      </div>
      {tabs[tab].component}
    </div>
  );
};

LibrarySearch.propTypes = {
  tab: propTabSearch.isRequired
};

const mapStateToProps = state => ({
  tab: state.cache.tabs.search
});

export default connect(
  mapStateToProps
)(LibrarySearch);
