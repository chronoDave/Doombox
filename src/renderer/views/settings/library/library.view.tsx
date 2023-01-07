import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import store from '../../../store/store';

export type LibraryViewProps = {};

const LibraryView: Component<LibraryViewProps> = () => {
  const component = new forgo.Component<LibraryViewProps>({
    render() {
      const { user } = store.get();

      return (
        <div>
          {user.library.folders.map(folder => (
            <p>{folder}</p>
          ))}
        </div>
      );
    }
  });

  return component;
};

export default LibraryView;
