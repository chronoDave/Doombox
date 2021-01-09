import React, { useState } from 'react';
import { cx } from 'emotion';

// Core
import { ButtonIcon } from '../../components';

import { VirtualSongs } from '../VirtualSongs';
import { VirtualAlbums } from '../VirtualAlbums';
import { VirtualLabels } from '../VirtualLabels';

// Styles
import useLibrarySearchStyles from './LibrarySearch.styles';

const LibrarySearch = () => {
  const [tab, setTab] = useState('song');
  const classes = useLibrarySearchStyles();

  const tabs = {
    song: {
      icon: 'artist',
      component: <VirtualSongs />,
    },
    album: {
      icon: 'minidisc',
      component: <VirtualAlbums />,
    },
    label: {
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
            onClick={() => setTab(key)}
          />
        ))}
      </div>
      {tabs[tab].component}
    </div>
  );
};

export default LibrarySearch;
