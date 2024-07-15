import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Icon from '@doombox/components/icon/icon';
import InputCheckbox from '@doombox/components/input-checkbox/input-checkbox';
import InputFolders from '@doombox/components/input-folder/input-folder';

import subscribe, { addFolders, removeFolders, setRomaji } from './library.state';

export type LibraryProps = {};

const Library: Component<LibraryProps> = () => {
  const component = new forgo.Component<LibraryProps>({
    render() {
      const { folders, romaji } = subscribe('Library', component);

      return (
        <form>
          <InputFolders
            id='library-folders'
            label='Library folders'
            folders={folders}
            onadd={addFolders}
            onremove={removeFolders}
          />
          <hr />
          <InputCheckbox
            id='library-romaji'
            label='Enable romaji'
            checked={romaji}
            onchange={setRomaji}
          >
            <p>When enabled, transliterates Japanese text to romaji. Requires reindex.</p>
          </InputCheckbox>
          <div class='form-group'>
            <button
              class='primary'
              type='button'
              onclick={() => {
                window.ipc.library.reindex();
                window.ipc.window.close();
              }}
            >
              <Icon id='folder-sync' />
              Reindex library
            </button>
          </div>
          <div class='form-group'>
            <button
              class='primary'
              type='button'
              onclick={() => {
                window.ipc.library.rebuild();
                window.ipc.window.close();
              }}
            >
              <Icon id='folder-search' />
              Rebuild library
            </button>
          </div>
        </form>
      );
    }
  });

  return component;
};

export default Library;
