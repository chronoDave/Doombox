import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';

// Actions
import {
  receiveCollection,
  receiveSizes
} from '../../actions/receiveActions';

// Utils
import {
  RECEIVE_COLLECTION,
  RECEIVE_STATUS,
  RECEIVE_SIZES
} from '../../actionTypes/receiveTypes';

// eslint-disable-next-line no-undef
const { ipcRenderer } = window.require('electron');

const addTimestamp = message => `[${new Date().toLocaleTimeString()}] ${message}`;

const IpcTest = props => {
  const { onCollectionReceive, onSizesReceive, enqueueSnackbar } = props;

  ipcRenderer.on(RECEIVE_COLLECTION, (event, arg) => {
    onCollectionReceive(arg.payload, arg.type);
    if (arg.payload.length === 0) {
      return enqueueSnackbar(
        addTimestamp(`Fetched 0 ${arg.type}`), {
          variant: 'warning',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right'
          }
        }
      );
    }
    return enqueueSnackbar(
      addTimestamp(`Fetched ${arg.payload.length} ${arg.type}`), {
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
  onSizesReceive: payload => dispatch(receiveSizes(payload))
});

export default connect(
  null,
  mapDispatchToProps
)(withSnackbar(IpcTest));
