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
          if (!id) return {};
          const { imageValue } = this.state;
          return imageValue[id];
        },
        updateConfig: (type, config) => updateStorage(
          TYPE.IPC.CONFIG.USER, type, config
        ),
        updateSystem: (type, config) => updateStorage(
          TYPE.IPC.CONFIG.SYSTEM, type, config
        ),
        updateCache: (type, cache) => updateStorage(
          TYPE.IPC.CONFIG.CACHE, type, cache
        )
      },
      messageValue: {},
      interruptValue: {},
      configValue: {
        [TYPE.CONFIG.GENERAL]: {},
        [TYPE.CONFIG.DISCORD]: {},
        [TYPE.CONFIG.KEYBIND]: {},
        [TYPE.CONFIG.KEYBIND]: {},
        [TYPE.CONFIG.PALETTE]: {},
        [TYPE.CONFIG.LIBRARY]: {},
        [TYPE.CONFIG.SEARCH]: {}
      },
      systemValue: {
        [TYPE.CONFIG.PARSER]: {}
      },
      imageValue: {},
      cacheValue: {
        [TYPE.CONFIG.GENERAL]: {}
      }
    };

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

    ipcRenderer.on(TYPE.IPC.CONFIG.SYSTEM, (event, { payload }) => {
      this.setState(state => ({
        ...state,
        systemValue: {
          ...state.systemValue,
          ...payload
        }
      }));
    });

    ipcRenderer.on(TYPE.IPC.CACHE, (event, { payload }) => {
      this.setState(state => ({
        ...state,
        cacheValue: {
          ...state.cacheValue,
          ...payload
        }
      }));
    });
  }

  componentDidMount() {
    readStorage(TYPE.IPC.CONFIG.USER);
    readStorage(TYPE.IPC.CONFIG.SYSTEM);
    readStorage(TYPE.IPC.CACHE);
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
      systemValue,
      configValue,
      imageValue,
      cacheValue
    } = this.state;

    return (
      <IpcContext.Method.Provider value={methodValue}>
        <IpcContext.Image.Provider value={imageValue}>
          <IpcContext.Config.Provider value={configValue}>
            <IpcContext.Keybind.Provider value={keybindValue}>
              <IpcContext.Message.Provider value={messageValue}>
                <IpcContext.Interrupt.Provider value={interruptValue}>
                  <IpcContext.System.Provider value={systemValue}>
                    <IpcContext.Cache.Provider value={cacheValue}>
                      {children}
                    </IpcContext.Cache.Provider>
                  </IpcContext.System.Provider>
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
