import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import secToTime from '../../../utils/time/secToTime';
import timeToHhMmSs from '../../../utils/time/timeToHhMmSs';
import Icon from '../../components/icon/icon';
import InputSearch from '../../components/inputSearch/inputSearch';
import VirtualList from '../../components/virtualList/virtualList';
import { addToPlaylist, setPlaylist } from '../../state/actions/playlist.actions';
import { searchLabels } from '../../state/actions/search.actions';
import { labelSelector, labelsSelector } from '../../state/selectors/label.selectors';
import { labelSearchSelector } from '../../state/selectors/search.selectors';
import { romajiSelector } from '../../state/selectors/user.selectors';

import './label.view.scss';

export type LabelViewProps = {};

const LabelView: Component<LabelViewProps> = () => {
  const component = new forgo.Component<LabelViewProps>({
    render() {
      const search = labelSearchSelector.get();
      const labels = (search ?? labelsSelector.get());
      const duration = labels
        .reduce((acc, cur) => acc + (labelSelector.get(cur).duration ?? 0), 0);

      const getSongs = (ids: string[]) => ids
        .map(id => labelSelector.get(id).songs)
        .flat();

      return (
        <div class="View LabelView">
          <h1 class='sr-only'>Label view</h1>
          <InputSearch
            placeholder='search for label'
            onsubmit={query => searchLabels(query)}
          />
          <div class='toolbar'>
            <p class='status'>
              <span><Icon id='accountMusic' />{labels.length}</span>
              <span><Icon id='stopwatch' />{timeToHhMmSs(secToTime(duration))}</span>
            </p>
            <div class='actions'>
              <button type='button' onclick={() => setPlaylist(getSongs(labels))}>
                <Icon id='playlistPlay' />
              </button>
              <button type='button' onclick={() => addToPlaylist(getSongs(labels))}>
                <Icon id='playlistAdd' />
              </button>
            </div>
          </div>
          <VirtualList
            list={labels}
            item={{
              height: 24,
              render: id => {
                const label = labelSelector.get(id);

                return (
                  <button
                    id={label._id}
                    type='button'
                    onclick={() => setPlaylist(label.songs)}
                  >
                    <div class='metadata'>
                      <p>{romajiSelector.get(label.label)}</p>
                    </div>
                    <div class='duration'>
                      <p>{timeToHhMmSs(secToTime(label.duration ?? 0), { fullTime: true })}</p>
                    </div>
                  </button>
                );
              }
            }}
          />
        </div>
      );
    }
  });

  component.unmount(() => {
    searchLabels('');
  });

  labelSearchSelector.subscribe(component);
  labelsSelector.subscribe(component);
  labelSelector.subscribe(component);
  romajiSelector.subscribe(component);

  return component;
};

export default LabelView;
