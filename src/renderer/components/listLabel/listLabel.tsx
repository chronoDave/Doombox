import type { Label } from '../../../types/library';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { playLabel } from '../../actions/queue.actions';
import VirtualList from '../virtualList/virtualList';

import './listLabel.scss';

export type ListLabelProps = {
  labels: Label[]
};

enum Action {
  PlayLabel = 'play-label'
}

const ListLabel: Component<ListLabelProps> = () => {
  const component = new forgo.Component<ListLabelProps>({
    render(props) {
      return (
        <VirtualList
          data={props.labels}
          onclick={(action, id) => {
            if (action === Action.PlayLabel) playLabel(id);
          }}
          cell={{
            id: cell => cell._id,
            height: () => 48,
            render: cell => <div class='ListLabel'>{cell.label}</div>
          }}
        />
      );
    }
  });

  return component;
};

export default ListLabel;
