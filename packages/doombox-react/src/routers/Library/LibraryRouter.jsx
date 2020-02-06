import React, {
  useEffect,
  useCallback
} from 'react';
import { TYPE } from '@doombox/utils';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Modules
import { Sidebar } from '../../modules';

// Pages
import {
  LibrarySongPage,
  LibraryLabelPage
} from '../../pages';

// Actions
import {
  fetchLibrary,
  fetchLabels
} from '../../actions';

// Hooks
import { useRoute } from '../../hooks';

// Utils
import {
  PATH,
  HOOK
} from '../../utils/const';

const LibraryRouter = ({ cacheSize }) => {
  const { page } = useRoute(HOOK.ROUTE.LOCATION);

  const renderPage = useCallback(() => {
    switch (page) {
      case PATH.PAGE.SONG:
        return <LibrarySongPage />;
      case PATH.PAGE.LABEL:
        return <LibraryLabelPage />;
      default:
        return null;
    }
  }, [page]);

  useEffect(() => {
    fetchLibrary(cacheSize);
  }, [cacheSize]);

  useEffect(() => {
    fetchLabels();
  }, []);

  return (
    <Sidebar>
      {renderPage()}
    </Sidebar>
  );
};

LibraryRouter.propTypes = {
  cacheSize: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  cacheSize: state.config[TYPE.CONFIG.ADVANCED].libraryCache
});

export default connect(
  mapStateToProps
)(LibraryRouter);
