import type Storage from '../../lib/storage/storage';
import type { TransferController } from '../../types/ipc';
import type { UserShape } from '../../types/shapes/user.shape';

export type UserControllerProps = {
  storage: Storage<UserShape>
};

export default (props: UserControllerProps): TransferController['user'] => ({
  get: async () => props.storage.state,
  set: async user => {
    props.storage.set(() => user);
    return props.storage.state;
  }
});
