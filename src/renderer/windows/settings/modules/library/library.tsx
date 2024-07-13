import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import InputFolders from '@doombox/components/input-folder/input-folder';

import { add, remove } from '../../state/actions/user';

import subscribe from './library.state';

export type LibraryProps = {};

const Library: Component<LibraryProps> = () => {
  const component = new forgo.Component<LibraryProps>({
    render() {
      const library = subscribe('Library', component);

      return (
        <div class='Library'>
          <InputFolders
            folders={library.folders}
            label='folders'
            onadd={add}
            onremove={remove}
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
        </div>
      );
    }
  });

  return component;
};

export default Library;
