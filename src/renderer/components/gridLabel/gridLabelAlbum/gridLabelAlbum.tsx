import type { Album } from '../../../../types/library';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import cx from '../../../utils/cx/cx';

import './gridLabelAlbum.scss';

export type GridLabelAlbumProps = {
  album: Album & { image: string }
  current?: string
  onclick: string
};

const GridLabelAlbum: Component<GridLabelAlbumProps> = () => {
  const component = new forgo.Component<GridLabelAlbumProps>({
    render(props) {
      return (
        <button
          type='button'
          data-id={props.album._id}
          data-action={props.onclick}
          aria-label={`Play ${props.album.album}`}
          class={cx(
            'GridLabelAlbum',
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
