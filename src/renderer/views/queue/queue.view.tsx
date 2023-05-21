import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import './queue.view.scss';

export type QueueViewProps = {};

const QueueView: Component<QueueViewProps> = () => {
  const component = new forgo.Component<QueueViewProps>({
    render() {
      return (
        <div class="View QueueView">QueueView</div>
      );
    }
  });

  return component;
};

export default QueueView;
