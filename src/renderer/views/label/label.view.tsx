import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import secToTime from '../../../utils/time/secToTime';
import timeToHhMmSs from '../../../utils/time/timeToHhMmSs';
import InputSearch from '../../components/inputSearch/inputSearch';
import VirtualList from '../../components/virtualList/virtualList';
import { addToPlaylist } from '../../state/actions/playlist.actions';
import { searchLabels } from '../../state/actions/search.actions';
import { labelSelector, labelsSelector } from '../../state/selectors/label.selectors';
import { labelSearchSelector } from '../../state/selectors/search.selectors';

import './label.view.scss';

export type LabelViewProps = {};

const LabelView: Component<LabelViewProps> = () => {
  const component = new forgo.Component<LabelViewProps>({
    render() {
      const search = labelSearchSelector.get();
      const labels = (search ?? labelsSelector.get());

      return (
        <div class="LabelView">
          <h1>All labels</h1>
          <InputSearch
            placeholder='search for label'
            onsubmit={query => searchLabels(query)}
          />
          <p>{labels.length} labels</p>
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
                    onclick={() => addToPlaylist(label.songs)}
                  >
                    <div class='metadata'>
                      <p>{label.romaji.label ?? label.label}</p>
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

  labelSearchSelector.subscribe(component);
  labelsSelector.subscribe(component);
  labelSelector.subscribe(component);

  return component;
};

export default LabelView;
