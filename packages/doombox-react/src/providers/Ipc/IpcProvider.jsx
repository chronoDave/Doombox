import React, { Component } from 'react';
import { TYPE } from '@doombox/utils';
import PropTypes from 'prop-types';

// Utils
import { IpcContext } from '../../utils/context';

const { ipcRenderer } = window.require('electron');

class IpcProvider extends Component {
  constructor() {
    super();

    this.state = {
      methodValue: {
        sendKeybind: (action, payload) => this.ipc.send(
          TYPE.IPC.KEYBIND,
          { action, data: payload }
        ),
        sendMessage: (action, payload) => this.ipc.send(
          TYPE.IPC.MESSAGE,
          { action, data: payload }
        ),
        sendInterrupt: (action, payload) => this.ipc.send(
          TYPE.IPC.INTERRUPT,
          { action, data: payload }
        )
      },
      keybindValue: {},
      messageValue: {},
      interruptValue: {}
    };

    // Create listeners
    Object.values(TYPE.IPC)
      .map(type => ipcRenderer.on(type, (event, payload) => {
        this.setState(state => ({ ...state, [type]: { ...payload } }));
      }));
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
      interruptValue
    } = this.state;

    return (
      <IpcContext.Method.Provider value={methodValue}>
        <IpcContext.Keybind.Provider value={keybindValue}>
          <IpcContext.Message.Provider value={messageValue}>
            <IpcContext.Interrupt.Provider value={interruptValue}>
              {children}
            </IpcContext.Interrupt.Provider>
          </IpcContext.Message.Provider>
        </IpcContext.Keybind.Provider>
      </IpcContext.Method.Provider>
    );
  }
}

IpcProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export default IpcProvider;
