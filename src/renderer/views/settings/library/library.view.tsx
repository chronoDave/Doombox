import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { rebuildLibrary } from '../../../actions/library.actions';
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
          <button type='button' onclick={rebuildLibrary}>
            Rebuild library
          </button>
        </div>
      );
    }
  });

  return store.subscribe(component, ['user']);
};

export default LibraryView;
