import type { Label } from '@doombox/types/library';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Time from '@doombox/lib/time/time';
import cx from '@doombox/renderer/css/cx';

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
          class={cx('library-label', props.current && props.label.songs.includes(props.current) && 'active')}
          data-id={props.label._id}
          data-action={props.action}
          aria-label={`Play ${props.label.label}`}
        >
          <div class='meta'>
            <p class='nowrap'>{props.label.label}</p>
            <dl class='horizontal reverse'>
              <div>
                <dt>Album(s)</dt>
                <dd>{props.label.albums.length}</dd>
              </div>
              <div>
                <dt>Track(s)</dt>
                <dd>{props.label.songs.length}</dd>
              </div>
              <div>
                <dt class='sr-only'>Duration</dt>
                <dd>{new Time(props.label.duration ?? 0).toShort()}</dd>
              </div>
            </dl>
          </div>
          <span class='hr' />
        </button>
      );
    }
  });

  return component;
};

export default LibraryLabel;
