import React, { Component } from 'react';
import { TYPE } from '@doombox/utils';
import PropTypes from 'prop-types';

// Actions
import {
  readStorage,
  readCollection,
  updateStorage
} from '../../actions';

// Utils
import { IpcContext } from '../../utils/context';

const { ipcRenderer } = window.require('electron');

class IpcProvider extends Component {
  constructor() {
    super();

    this.state = {
      methodValue: {
        getImageById: id => {
          const { imageValue } = this.state;
          return imageValue[id];
        },
        updatePalette: palette => updateStorage(
          TYPE.IPC.CONFIG.USER,
          TYPE.CONFIG.PALETTE,
          palette
        ),
        setBackgroundOpacity: backgroundOpacity => updateStorage(
          TYPE.IPC.CONFIG.USER,
          TYPE.CONFIG.PALETTE,
          { backgroundOpacity }
        )
      },
      keybindValue: {},
      messageValue: {},
      interruptValue: {},
      configValue: {},
      imageValue: {}
    };

    ipcRenderer.on(TYPE.IPC.KEYBIND, (event, payload) => {
      this.setState(state => ({ ...state, keybindValue: payload }));
    });

    ipcRenderer.on(TYPE.IPC.MESSAGE, (event, payload) => {
      this.setState(state => ({ ...state, messageValue: payload }));
    });

    ipcRenderer.on(TYPE.IPC.INTERRUPT, (event, payload) => {
      this.setState(state => ({ ...state, interruptValue: payload }));
    });

    ipcRenderer.on(TYPE.IPC.IMAGE, (event, payload) => {
      this.setState(state => ({ ...state, imageValue: payload }));
    });

    ipcRenderer.on(TYPE.IPC.CONFIG.USER, (event, { payload }) => {
      this.setState(state => ({
        ...state,
        configValue: {
          ...state.configValue,
          ...payload
        }
      }));
    });
  }

  componentDidMount() {
    readStorage(TYPE.IPC.CONFIG.USER, TYPE.CONFIG.PALETTE);
    readCollection(TYPE.IPC.IMAGE, { castObject: true });
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners();
  }

  render() {
    const { children } = this.props;
    const {
      methodValue,
      keybindValue,
      messageValue,
      interruptValue,
      configValue,
      imageValue
    } = this.state;

    return (
      <IpcContext.Method.Provider value={methodValue}>
        <IpcContext.Image.Provider value={imageValue}>
          <IpcContext.Config.Provider value={configValue}>
            <IpcContext.Keybind.Provider value={keybindValue}>
              <IpcContext.Message.Provider value={messageValue}>
                <IpcContext.Interrupt.Provider value={interruptValue}>
                  {children}
                </IpcContext.Interrupt.Provider>
              </IpcContext.Message.Provider>
            </IpcContext.Keybind.Provider>
          </IpcContext.Config.Provider>
        </IpcContext.Image.Provider>
      </IpcContext.Method.Provider>
    );
  }
}

IpcProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export default IpcProvider;
