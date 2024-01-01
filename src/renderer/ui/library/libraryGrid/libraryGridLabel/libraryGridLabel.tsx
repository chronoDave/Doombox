import type { Album, Label } from '../../../../../types/library';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import secToTime from '../../../../../utils/time/secToTime';
import timeToShort from '../../../../../utils/time/timeToShort';
import Glyph from '../../../../components/glyph/glyph';

import './libraryGridLabel.scss';

export type LibraryGridLabelProps = {
  label: Label<string | Album>
  action: string
};

const LibraryGridLabel: Component<LibraryGridLabelProps> = () => {
  const component = new forgo.Component<LibraryGridLabelProps>({
    render(props) {
      return (
        <button
          type='button'
          class='LibraryGridLabel'
          data-id={props.label._id}
          data-action={props.action}
          aria-label={`Play ${props.label.label}`}
        >
          <div class='meta'>
            <p class='nowrap'>{props.label.label}</p>
            <p class='nowrap small'>{props.label.albums.length} albums<Glyph id='dot' />{props.label.songs.length} tracks<Glyph id='dot' />{timeToShort(secToTime(props.label.duration ?? 0))}</p>
          </div>
          <span class='hr' />
        </button>
      );
    }
  });

  return component;
};

export default LibraryGridLabel;
