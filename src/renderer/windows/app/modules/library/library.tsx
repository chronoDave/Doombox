import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import VirtualGrid from '@doombox/components/virtualGrid/virtualGrid';

import { addAlbumToQueue, playAlbum, playLabel } from '../../actions/queue.actions';
import useMediaQuery from '../../hooks/useMediaQuery';

import subscribe from './library.state';
import LibraryAlbum from './libraryAlbum/libraryAlbum';
import LibraryLabel from './libraryLabel/libraryLabel';

export type LibraryProps = {};

enum Action {
  PlayLabel = 'play-label',
  PlayAlbum = 'play-album'
}

const Library: Component<LibraryProps> = () => {
  let width = 72;

  const component = new forgo.Component<LibraryProps>({
    render() {
      const state = subscribe(component);

      return (
        <VirtualGrid
          data={state.data}
          onclick={(data, event) => {
            if (data.id && data.action === Action.PlayAlbum) {
              if (event.shiftKey) {
                addAlbumToQueue(data.id);
              } else {
                playAlbum(data.id);
              }
            }
            if (data.id && data.action === Action.PlayLabel) playLabel(data.id);
          }}
          cell={{
            id: cell => cell._id,
            width: cell => 'albums' in cell ? null : width,
            height: cell => 'albums' in cell ? 48 : null,
            render: cell => {
              if ('albums' in cell) {
                return (
                  <LibraryLabel
                    action={Action.PlayLabel}
                    label={cell}
                    current={state.current}
                  />
                );
              }
              return (
                <LibraryAlbum
                  action={Action.PlayAlbum}
                  album={cell}
                  current={state.current}
                />
              );
            }
          }}
        />
      );
    }
  });

  useMediaQuery([
    '(min-width: 720px) and (min-height: 480px)',
    '(min-width: 960px) and (min-height: 720px)'
  ])(i => {
    width = 72 + (32 * (i + 1));
  })(component);

  return component;
};

export default Library;
