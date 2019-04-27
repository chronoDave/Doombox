import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';

// Actions
import {
  receiveCollection,
  receiveSizes,
  receiveDatabaseCreated,
  receiveSearchSize,
  receiveSearchQuery
} from '../../actions/receiveActions';

// Utils
import {
  RECEIVE_COLLECTION,
  RECEIVE_STATUS,
  RECEIVE_SIZES,
  RECEIVE_DATABASE_CREATED,
  RECEIVE_SEARCH
} from '../../actionTypes/receiveTypes';
import {
  VIEW_SONG,
  VIEW_ALBUM,
  VIEW_LABEL,
} from '../../actionTypes/windowTypes';

// eslint-disable-next-line no-undef
const { ipcRenderer } = window.require('electron');

const addTimestamp = message => `[${new Date().toLocaleTimeString()}] ${message}`;

const IpcListener = props => {
  const {
    onCollectionReceive,
    onSizesReceive,
    enqueueSnackbar,
    onDatabaseCreated,
    onSearchSizeReceive,
    onQueryReceive
  } = props;

  const getViewName = view => {
    switch (view) {
      case VIEW_SONG:
        return 'songs';
      case VIEW_ALBUM:
        return 'albums';
      case VIEW_LABEL:
        return 'labels';
      default:
        return null;
    }
  };

  ipcRenderer.on(RECEIVE_DATABASE_CREATED, () => onDatabaseCreated());

  ipcRenderer.on(RECEIVE_COLLECTION, (event, arg) => {
    onCollectionReceive(arg.payload, arg.type);
    if (arg.payload.length === 0) {
      return enqueueSnackbar(
        addTimestamp(`Fetched 0 ${getViewName(arg.type)}`), {
          variant: 'warning',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right'
          }
        }
      );
    }
    return enqueueSnackbar(
      addTimestamp(`Fetched ${arg.payload.length} ${getViewName(arg.type)}`), {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        }
      }
    );
  });

  ipcRenderer.on(RECEIVE_SEARCH, (event, arg) => {
    onCollectionReceive(arg.payload.collection, arg.type);
    onSearchSizeReceive(arg.payload.size);
    onQueryReceive(arg.payload.query);
    enqueueSnackbar(
      addTimestamp(`Found ${arg.payload.size} songs with the query: "${arg.payload.query}"`), {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        }
      }
    );
  });

  ipcRenderer.on(RECEIVE_STATUS, (event, arg) => enqueueSnackbar(
    addTimestamp(arg.payload), {
      variant: arg.variant,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
      }
    }
  ));

  ipcRenderer.on(RECEIVE_SIZES, (event, arg) => onSizesReceive(arg.payload));

  return null;
};

const mapDispatchToProps = dispatch => ({
  onCollectionReceive: (payload, type) => dispatch(receiveCollection(payload, type)),
  onSizesReceive: payload => dispatch(receiveSizes(payload)),
  onSearchSizeReceive: payload => dispatch(receiveSearchSize(payload)),
  onDatabaseCreated: () => dispatch(receiveDatabaseCreated()),
  onQueryReceive: payload => dispatch(receiveSearchQuery(payload))
});

export default connect(
  null,
  mapDispatchToProps
)(withSnackbar(IpcListener));
