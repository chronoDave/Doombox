import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { toMinSec } from '../../../utils/string/formatTime';
import InputSearch from '../../components/inputSearch/inputSearch';
import VirtualList from '../../components/virtualList/virtualList';
import { addToPlaylist } from '../../state/actions/playlist.actions';
import { searchLabels } from '../../state/actions/search.actions';
import { getLabel, getLabels } from '../../state/selectors/label.selector';
import store from '../../state/store';

import './label.view.scss';

export type LabelViewProps = {};

const LabelView: Component<LabelViewProps> = () => {
  const component = new forgo.Component<LabelViewProps>({
    render() {
      const { search } = store.get();
      const labels = (search.labels ?? getLabels()) as string[];

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
            overflow={3}
            item={{
              height: 24,
              render: id => {
                const label = getLabel(id);

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
                      <p>{toMinSec(label.duration ?? 0)}</p>
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

  return store.subscribe(component, (prev, cur) => (
    !prev.search.labels ||
    cur.search.labels?.length !== prev.search.labels.length ||
    cur.search.labels.every((id, i) => prev.search.labels?.[i] === id)
  ));
};

export default LabelView;
