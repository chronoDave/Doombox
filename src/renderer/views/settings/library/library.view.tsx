import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import InputFolders from '../../../components/inputFolders/inputFolders';
import store from '../../../store/store';

export type LibraryViewProps = {};

const LibraryView: Component<LibraryViewProps> = () => {
  const component = new forgo.Component<LibraryViewProps>({
    render() {
      const { user } = store.get();

      return (
        <div>
          <InputFolders
            folders={user.library.folders}
            label='folders'
            onadd={console.log}
            onremove={console.log}
          />
        </div>
      );
    }
  });

  return store.subscribe(component, ['user']);
};

export default LibraryView;
