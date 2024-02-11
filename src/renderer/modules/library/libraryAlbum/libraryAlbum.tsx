import type { Album } from '../../../../types/library';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Icon from '../../../components/icon/icon';
import cx from '../../../utils/cx/cx';

import './libraryAlbum.scss';

export type LibraryAlbumProps = {
  album: Album
  image: (id: string, size: number) => string
  current: string | null
  action: string
};

const LibraryAlbum: Component<LibraryAlbumProps> = () => {
  const component = new forgo.Component<LibraryAlbumProps>({
    render(props) {
      return (
        <button
          type='button'
          data-id={props.album._id}
          data-action={props.action}
          aria-label={`Play ${props.album.album}`}
          class={cx(
            'LibraryAlbum',
            props.current && props.album.songs.includes(props.current) && 'active'
          )}
        >
          {props.album.image ? (
            <picture>
              <source
                srcset={props.image(props.album.image, 256)}
                media="(min-width: 960px) and (min-height: 720px)"
                width={256}
                height={256}
              />
              <source
                srcset={props.image(props.album.image, 192)}
                media="(min-width: 720px) and (min-height: 480px)"
                width={192}
                height={192}
              />
              <img
                srcset={props.image(props.album.image, 128)}
                alt=''
                width={128}
                height={128}
              />
            </picture>
          ) : (
            <Icon id='music-note' />
          )}
        </button>
      );
    }
  });

  return component;
};

export default LibraryAlbum;
