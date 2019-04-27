import { Component } from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';

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
  RECEIVE_SEARCH,
  RECEIVE_COMMAND,
  RECEIVE_COMMAND_NEXT,
  RECEIVE_COMMAND_PREVIOUS,
  RECEIVE_COMMAND_PLAY,
  RECEIVE_COMMAND_VOLUME_UP,
  RECEIVE_COMMAND_VOLUME_DOWN
} from '../../actionTypes/receiveTypes';
import {
  VIEW_SONG,
  VIEW_ALBUM,
  VIEW_LABEL,
} from '../../actionTypes/windowTypes';
import { increaseVolume, decreaseVolume, toggleStatus } from '../../actions/songActions';
import { setIndexNext, setIndexPrevious } from '../../actions/playlistActions';

// eslint-disable-next-line no-undef
const { ipcRenderer } = window.require('electron');

const addTimestamp = message => `[${new Date().toLocaleTimeString()}] ${message}`;
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

class IpcListener extends Component {
  constructor(props) {
    super(props);

    const {
      onVolumeIncrease,
      onVolumeDecrease,
      onIndexNext,
      onIndexPrevious,
      onDatabaseCreated,
      onCollectionReceive,
      enqueueSnackbar,
      onSearchSizeReceive,
      onQueryReceive,
      onSizesReceive,
      onStatusToggle
    } = props;

    ipcRenderer.on(RECEIVE_COMMAND, (event, arg) => {
      switch (arg.type) {
        case RECEIVE_COMMAND_NEXT:
          onIndexNext();
          break;
        case RECEIVE_COMMAND_PREVIOUS:
          onIndexPrevious();
          break;
        case RECEIVE_COMMAND_PLAY:
          onStatusToggle();
          break;
        case RECEIVE_COMMAND_VOLUME_UP:
          onVolumeIncrease();
          break;
        case RECEIVE_COMMAND_VOLUME_DOWN:
          onVolumeDecrease();
          break;
        default:
          break;
      }
    });

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
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = dispatch => ({
  onIndexNext: () => dispatch(setIndexNext()),
  onIndexPrevious: () => dispatch(setIndexPrevious()),
  onStatusToggle: () => dispatch(toggleStatus()),
  onVolumeIncrease: () => dispatch(increaseVolume()),
  onVolumeDecrease: () => dispatch(decreaseVolume()),
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
