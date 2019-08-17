import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';

// Core
import { useAudio } from '../../../components/Audio';

const AlbumView = ({ library }) => {
  const { set } = useAudio();

  useEffect(() => {
    if (library) set(library);
  }, [library]);

  return useMemo(() => (
    <div>
      AlbumView
    </div>
  ), [set]);
};

const mapStateToProps = state => ({
  library: state.library.collection
});

export default connect(
  mapStateToProps
)(AlbumView);
