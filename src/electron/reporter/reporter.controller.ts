import Ipc, { IpcController } from '@doombox/ipc';

import Reporter from './reporter';

const controller: IpcController<'REPORTER'> = {
  LOG: (payload: unknown) => {
    if (!Ipc.isValid<'REPORTER', { title: string, text: string }>(payload)) {
      return Promise.reject(new Error(`Invalid payload: ${payload}`));
    }
    return Promise.resolve(Reporter.log(payload.data.title, payload.data.text));
  },
  WARN: (payload: unknown) => {
    if (!Ipc.isValid<'REPORTER', { title: string, error: Error, description?: string }>(payload)) {
      return Promise.reject(new Error(`Invalid payload: ${payload}`));
    }
    return Promise.resolve(Reporter.warn(payload.data.title, payload.data.error, payload.data.description));
  },
  ERROR: (payload: unknown) => {
    if (!Ipc.isValid<'REPORTER', { title: string, error: Error, description?: string }>(payload)) {
      return Promise.reject(new Error(`Invalid payload: ${payload}`));
    }
    return Promise.resolve(Reporter.error(payload.data.title, payload.data.error, payload.data.description));
  },
};

export default controller;
