import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import InputFolders from '../../../components/inputFolders/inputFolders';
import {
  addFolders,
  rebuildLibrary,
  reindexLibrary,
  removeFolders
} from '../../../state/actions/library.actions';
import { userLibrarySelector } from '../../../state/selectors/user.selectors';

export type SettingsLibraryProps = {};

const SettingsLibrary: Component<SettingsLibraryProps> = () => {
  const component = new forgo.Component<SettingsLibraryProps>({
    render() {
      const userLibrary = userLibrarySelector.get();

      return (
        <div>
          <InputFolders
            folders={userLibrary.folders}
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

  return userLibrarySelector.subscribe(component);
};

export default SettingsLibrary;
