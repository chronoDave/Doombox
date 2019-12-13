import React, { Component } from 'react';
import { TYPE, STORAGE } from '@doombox/utils';
import PropTypes from 'prop-types';

// Actions
import { readStorage } from '../../actions';

// Utils
import { IpcContext } from '../../utils/context';

const { ipcRenderer } = window.require('electron');

class IpcProvider extends Component {
  constructor() {
    super();

    this.state = {
      keybindValue: {},
      messageValue: {},
      interruptValue: {},
      configValue: {}
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
    readStorage(TYPE.IPC.CONFIG.USER, STORAGE.PALETTE);
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners();
  }

  render() {
    const { children } = this.props;
    const {
      keybindValue,
      messageValue,
      interruptValue,
      configValue
    } = this.state;

    return (
      <IpcContext.Config.Provider value={configValue}>
        <IpcContext.Keybind.Provider value={keybindValue}>
          <IpcContext.Message.Provider value={messageValue}>
            <IpcContext.Interrupt.Provider value={interruptValue}>
              {children}
            </IpcContext.Interrupt.Provider>
          </IpcContext.Message.Provider>
        </IpcContext.Keybind.Provider>
      </IpcContext.Config.Provider>
    );
  }
}

IpcProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export default IpcProvider;
