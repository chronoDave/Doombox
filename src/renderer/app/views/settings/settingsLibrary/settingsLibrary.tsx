import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import {
  addFolders,
  rebuildLibrary,
  reindexLibrary,
  removeFolders
} from '../../../actions/library.actions';
import InputFolders from '../../../components/inputFolders/inputFolders';

import subscribe from './settingsLibrary.state';

export type SettingsLibraryProps = {};

const SettingsLibrary: Component<SettingsLibraryProps> = () => {
  const component = new forgo.Component<SettingsLibraryProps>({
    render() {
      const library = subscribe(component);

      return (
        <div class='SettingsLibrary'>
          <InputFolders
            folders={library.folders}
            label='folders'
            onadd={addFolders}
            onremove={removeFolders}
          />
          <button
            class='button'
            type='button'
            onclick={reindexLibrary}
          >
            Reindex library
          </button>
          <button
            class='button'
            type='button'
            onclick={rebuildLibrary}
          >
            Rebuild library
          </button>
        </div>
      );
    }
  });

  return component;
};

export default SettingsLibrary;
