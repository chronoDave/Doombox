import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

// Core
import { VirtualTable } from '../../components/VirtualTable';
import { useAudio } from '../../components/Provider';

const populatePlaylist = (playlist, list) => (
  playlist.map(({ _id }) => list.find(item => item._id === _id))
);

const PlaylistTable = () => {
  const { playlist } = useAudio();
  const library = useSelector(state => state.library.collection);

  return useMemo(() => (
    <VirtualTable
      columns={[
        { key: 'title' },
        { key: 'artist' },
        { key: 'album' },
        { key: 'label', value: 'albumartist' }
      ]}
      rows={populatePlaylist(playlist, library)}
    />
  ), [playlist]);
};

export default PlaylistTable;
