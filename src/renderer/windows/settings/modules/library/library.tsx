import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import InputFolders from '@doombox/components/input-folder/input-folder';

import subscribe, { addFolders, removeFolders } from './library.state';

export type LibraryProps = {};

const Library: Component<LibraryProps> = () => {
  const component = new forgo.Component<LibraryProps>({
    render() {
      const library = subscribe('Library', component);

      return (
        <form>
          <InputFolders
            id='library-folders'
            label='Library folders'
            folders={library.folders}
            onadd={addFolders}
            onremove={removeFolders}
          />
          <button
            class='button'
            type='button'
            onclick={() => window.ipc.library.reindex(library.folders)}
          >
            Reindex library
          </button>
          <button
            class='button'
            type='button'
            onclick={() => window.ipc.library.rebuild()}
          >
            Rebuild library
          </button>
        </form>
      );
    }
  });

  return component;
};

export default Library;
