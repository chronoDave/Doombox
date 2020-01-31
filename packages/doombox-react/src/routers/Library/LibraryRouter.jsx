import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
  useMemo
} from 'react';
import groupby from 'lodash.groupby';
import { useTranslation } from 'react-i18next';

// Core
import { Box } from '@material-ui/core';

import {
  BackgroundAlbum,
  Loader
} from '../../components';

// Modules
import {
  VirtualLabel,
  VirtualLibrary,
  Sidebar,
  Toolbar
} from '../../modules';

// Hooks
import {
  useRoute,
  useIpc,
  useAudio
} from '../../hooks';

// Utils
import {
  formatTime,
  shuffleArray,
  sortLibrary
} from '../../utils';
import {
  HOOK,
  PATH
} from '../../utils/const';

const LibraryRouter = () => {
  const [collection, setCollection] = useState(null);

  const { page } = useRoute(HOOK.ROUTE.LOCATION);
  const { setPage } = useRoute(HOOK.ROUTE.METHOD);
  const { t } = useTranslation();

  const {
    setPlaylist,
    createSong
  } = useAudio(HOOK.AUDIO.METHOD);
  const library = useAudio(HOOK.AUDIO.LIBRARY);
  const images = useIpc(HOOK.IPC.IMAGE);

  useEffect(() => {
    if (!Object.values(PATH.PAGE).includes(page)) {
      setPage(PATH.PAGE.LABEL);
    }
  }, [page, setPage]);

  useEffect(() => {
    if (library && library.length !== 0) {
      switch (page) {
        case PATH.PAGE.LABEL:
          setCollection(Object
            .entries(groupby(library, 'metadata.albumartist'))
            .sort((a, b) => {
              const aAlbumartist = a[1][0].metadata.albumartist.toLowerCase();
              const bAlbumartist = b[1][0].metadata.albumartist.toLowerCase();

              if (aAlbumartist < bAlbumartist) return -1;
              if (aAlbumartist > bAlbumartist) return 1;
              return 0;
            })
            .map(([albumartist, songs]) => ({
              albumartist,
              albums: Object
                .entries(groupby(songs, 'metadata.album'))
                .sort((a, b) => {
                  const aMetadata = a[1][0].metadata;
                  const bMetadata = b[1][0].metadata;

                  if (aMetadata.year < bMetadata.year) return -1;
                  if (aMetadata.year > bMetadata.year) return 1;
                  if (aMetadata.album < bMetadata.album.toLowerCase()) return -1;
                  if (aMetadata.album > bMetadata.album.toLowerCase()) return 1;
                  return 0;
                })
                .map(([album, tracks]) => ({
                  album,
                  cover: tracks[0].images ? images[tracks[0].images[0]] : null,
                  songs: tracks.sort((a, b) => a.metadata.track.no - b.metadata.track.no)
                }))
            })));
          break;
        case PATH.PAGE.SONG:
          setCollection(Object
            .entries(groupby(library, 'metadata.album'))
            .sort((a, b) => {
              const aMetadata = a[1][0].metadata;
              const bMetadata = b[1][0].metadata;

              if (aMetadata.albumartist < bMetadata.albumartist) return -1;
              if (aMetadata.albumartist > bMetadata.albumartist) return 1;
              if (aMetadata.year < bMetadata.year) return -1;
              if (aMetadata.year > bMetadata.year) return 1;
              return 0;
            })
            .map(([album, values]) => [
              {
                divider: {
                  primary: album,
                  secondary: [
                    values[0].metadata.albumartist,
                    values[0].metadata.year,
                    t('trackCount', { count: values.length }),
                    formatTime(
                      values.reduce((acc, cur) => acc + cur.format.duration, 0),
                      'text'
                    )
                  ].join(' \u2022 '),
                  album: values
                },
              },
              ...values.sort((a, b) => {
                if (a.metadata.track.no < b.metadata.track.no) return -1;
                if (a.metadata.track.no > b.metadata.track.no) return 1;
                return 0;
              })
            ])
            .flat());
          break;
        default:
          break;
      }
    }
  }, [library, page, images, setCollection, t]);

  const renderPage = useMemo(() => {
    if (!collection) return <Loader context="library" />;
    if (collection.length === 0) return 'No songs founds';

    switch (page) {
      case PATH.PAGE.LABEL:
        return <VirtualLabel labels={collection} />;
      case PATH.PAGE.SONG:
        return <VirtualLibrary library={collection} />;
      default:
        return null;
    }
  }, [collection, page]);

  const handlePlay = useCallback(() => {
    setPlaylist('Library', sortLibrary(library));
    createSong();
  }, [createSong, library, setPlaylist]);

  const handleShuffle = useCallback(() => {
    setPlaylist('Library', shuffleArray(library));
    createSong();
  }, [createSong, library, setPlaylist]);

  return (
    <Sidebar>
      <Box
        pl="1px"
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
      >
        {useMemo(() => (
          <Fragment>
            <BackgroundAlbum />
            <Toolbar
              onPlay={handlePlay}
              onShuffle={handleShuffle}
            />
          </Fragment>
        ), [handlePlay, handleShuffle])}
        <Box flexGrow={1}>
          {renderPage}
        </Box>
      </Box>
    </Sidebar>
  );
};

export default LibraryRouter;
