import type Storage from '../storage';
import type { IpcChannel, IpcInvokeController } from '../../../types/ipc';
import type { UserShape } from '../../../types/shapes/user.shape';

export type UserControllerProps = {
  storage: Storage<UserShape>
};

export default (props: UserControllerProps): IpcInvokeController[IpcChannel.User] => ({
  all: async () => props.storage.all(),
  get: async payload => props.storage.get(payload.key),
  set: async payload => {
    props.storage.set(payload.key, payload.value);
    return props.storage.get(payload.key);
  }
});
