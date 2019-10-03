import React, {
  Fragment,
  useEffect,
  useCallback,
  useMemo
} from 'react';
import { connect } from 'react-redux';

// Core
import { Box } from '@material-ui/core';

import { BackgroundFade } from '../../../components/Background';
import { useAudio } from '../../../components/Provider';
import { VirtualTable } from '../../../components/VirtualTable';

// Api
import { fetchCollection } from '../../../api';

// Utils
import { memoProps } from '../../../utils';

const headers = ['title', 'artist', 'album', 'label'];

const SongView = ({ library, fetchSongs }) => {
  const { set, play } = useAudio();

  useEffect(() => {
    fetchSongs('TALB');
  }, []);

  const handleClick = useCallback(({ _id, path, APIC }) => {
    set([{ _id, path, APIC }]);
    play(0);
  }, []);

  return useMemo(() => (
    library ? (
      <Fragment>
        <BackgroundFade />
        <Box p={2} pr={0} height="100%">
          <VirtualTable
            columns={headers}
            rows={library}
            itemData={memoProps({
              collection: library,
              handleClick
            })}
          />
        </Box>
      </Fragment>
    ) : null
  ), [library]);
};

const mapStateToProps = state => ({
  library: state.library.grouped
});

const mapDispatchToProps = dispatch => ({
  fetchSongs: type => dispatch(fetchCollection({
    type,
    projection: {
      path: 1,
      TIT2: 1,
      TPE1: 1,
      TPE2: 1,
      TALB: 1,
      APIC: 1
    },
    sort: {
      TYER: 1,
      TALB: 1
    }
  }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongView);
