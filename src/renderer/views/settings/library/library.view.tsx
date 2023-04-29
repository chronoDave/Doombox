import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import InputFolders from '../../../components/inputFolders/inputFolders';
import { addFolders, rebuildLibrary, reindexLibrary, removeFolders } from '../../../state/actions/library.actions';
import store from '../../../state/store';
import createSubscription from '../../../utils/subscribe';

export type LibraryViewProps = {};

const LibraryView: Component<LibraryViewProps> = () => {
  const subscribe = createSubscription(store);
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
          <button type='button' onclick={() => reindexLibrary()}>
            Reindex library
          </button>
          <button type='button' onclick={() => rebuildLibrary()}>
            Rebuild library
          </button>
        </div>
      );
    }
  });

  return subscribe((prev, cur) => (
    Object.is(prev.user.library.folders, cur.user.library.folders)
  ))(component);
};

export default LibraryView;
