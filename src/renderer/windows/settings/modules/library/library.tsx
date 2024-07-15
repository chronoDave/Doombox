import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Icon from '@doombox/components/icon/icon';
import InputFolders from '@doombox/components/input-folder/input-folder';

import subscribe, { addFolders, removeFolders } from './library.state';

export type LibraryProps = {};

const Library: Component<LibraryProps> = () => {
  const component = new forgo.Component<LibraryProps>({
    render() {
      const folders = subscribe('Library', component);

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
          <div class='form-group'>
            <button
              class='primary'
              type='button'
              onclick={() => window.ipc.library.reindex()}
            >
              <Icon id='folder-sync' />
              Reindex library
            </button>
            <p>Scan current library for new songs and deletes old songs</p>
          </div>
          <div class='form-group'>
            <button
              class='primary'
              type='button'
              onclick={() => window.ipc.library.rebuild()}
            >
              <Icon id='folder-search' />
              Rebuild library
            </button>
            <p>Rescan entire library</p>
          </div>
        </form>
      );
    }
  });

  return component;
};

export default Library;
