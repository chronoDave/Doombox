import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import InputFolders from '../../../components/inputFolders/inputFolders';
import { addFolders, rebuildLibrary, removeFolders } from '../../../state/actions/library.actions';
import store from '../../../state/store';

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
            onadd={addFolders}
            onremove={removeFolders}
          />
          <button type='button' onclick={() => rebuildLibrary()}>
            Rebuild library
          </button>
          <button type='button' onclick={() => rebuildLibrary(true)}>
            Force rebuild library
          </button>
        </div>
      );
    }
  });

  return store.subscribe(component, (prev, cur) => (
    Object.is(prev.user.library.folders, cur.user.library.folders)
  ));
};

export default LibraryView;
