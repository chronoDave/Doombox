import type { Album } from '../../../../../types/library';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import cx from '../../../../utils/cx/cx';

import './libraryGridAlbum.scss';

export type LibraryGridAlbumProps = {
  album: Album & { image: string }
  current: string | null
  action: string
};

const GridLabelAlbum: Component<LibraryGridAlbumProps> = () => {
  const component = new forgo.Component<LibraryGridAlbumProps>({
    render(props) {
      return (
        <button
          type='button'
          data-id={props.album._id}
          data-action={props.action}
          aria-label={`Play ${props.album.album}`}
          class={cx(
            'LibraryGridAlbum',
            props.current && props.album.songs.includes(props.current) && 'active'
          )}
        >
          <img src={props.album.image} alt='' width={72} height={72} />
        </button>
      );
    }
  });

  return component;
};

export default GridLabelAlbum;
