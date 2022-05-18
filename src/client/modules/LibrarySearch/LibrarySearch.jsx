import React from 'react';
import { TYPES, WINDOW } from '@doombox-utils/types';
import { connect } from 'react-redux';
import { cx } from 'emotion';

// Core
import { ButtonIcon } from '../../components';

import {
  VirtualSongs,
  VirtualAlbums,
  VirtualLabels
} from '..';

// Actions
import { updateCache } from '../../actions';

// Validation
import { propTabSearch } from '../../validation/propTypes';

// Styles
import useLibrarySearchStyles from './LibrarySearch.styles';

const LibrarySearch = ({ tab }) => {
  const classes = useLibrarySearchStyles();

  const tabs = {
    [WINDOW.TABS.SONGS]: {
      icon: 'artist',
      component: <VirtualSongs />,
    },
    [WINDOW.TABS.ALBUMS]: {
      icon: 'minidisc',
      component: <VirtualAlbums />,
    },
    [WINDOW.TABS.LABELS]: {
      icon: 'record',
      component: <VirtualLabels />
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.icons}>
        {Object.entries(tabs).map(([key, { icon }]) => (
          <ButtonIcon
            key={key}
            icon={icon}
            small
            className={cx(classes.icon, { [classes.active]: key === tab })}
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
