import { IpcAction, IpcPayload } from '@doombox-types';

export type IpcController = Partial<Record<IpcAction, (payload: IpcPayload) => Promise<unknown>>>;
