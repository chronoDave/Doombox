import React, { cloneElement } from 'react';
import { useTranslation } from 'react-i18next';

// Icons
import IconPlaylist from '@material-ui/icons/ArtTrack';
import IconLabel from '@material-ui/icons/Album';
import IconAlbum from '@material-ui/icons/LibraryMusic';
import IconSong from '@material-ui/icons/Audiotrack';

// Core
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@material-ui/core';

// Hooks
import { useRoute } from '../../hooks';

// Utils
import { MAIN_VIEWS } from '../../utils/const';

const SidebarViews = () => {
  const { view, setView } = useRoute();
  const { t } = useTranslation();

  return (
    <List>
      {[
        { key: MAIN_VIEWS.PLAYLIST, icon: <IconPlaylist /> },
        { key: MAIN_VIEWS.LABEL, icon: <IconLabel /> },
        { key: MAIN_VIEWS.ALBUM, icon: <IconAlbum /> },
        { key: MAIN_VIEWS.SONG, icon: <IconSong /> }
      ].map(({ key, icon }) => (
        <ListItem
          key={key}
          button
          onClick={() => setView(key)}
        >
          <ListItemIcon>
            {cloneElement(icon, { color: view === key ? 'primary' : 'inherit' })}
          </ListItemIcon>
          <ListItemText
            primary={t(key.toLowerCase())}
            primaryTypographyProps={{ color: view === key ? 'primary' : 'inherit' }}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default SidebarViews;
