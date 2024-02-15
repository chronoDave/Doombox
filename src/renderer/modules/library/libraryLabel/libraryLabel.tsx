import type { Label } from '../../../../types/library';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import secToTime from '../../../../utils/time/secToTime';
import timeToShort from '../../../../utils/time/timeToShort';
import cx from '../../../utils/cx/cx';

import './libraryLabel.scss';

export type LibraryLabelProps = {
  label: Label
  action: string
  current: string | null
};

const LibraryLabel: Component<LibraryLabelProps> = () => {
  const component = new forgo.Component<LibraryLabelProps>({
    render(props) {
      return (
        <button
          type='button'
          class={cx('LibraryLabel', props.current && props.label.songs.includes(props.current) && 'active')}
          data-id={props.label._id}
          data-action={props.action}
          aria-label={`Play ${props.label.label}`}
        >
          <div class='meta'>
            <p class='nowrap'>{props.label.label}</p>
            <p class='nowrap'>{props.label.albums.length} albums<span class='glyph dot' />{props.label.songs.length} tracks<span class='glyph dot' />{timeToShort(secToTime(props.label.duration ?? 0))}</p>
          </div>
          <span class='hr' />
        </button>
      );
    }
  });

  return component;
};

export default LibraryLabel;
