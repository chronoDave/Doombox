import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

export type LabelViewProps = {};

const LabelView: Component<LabelViewProps> = () => {
  const component = new forgo.Component<LabelViewProps>({
    render() {
      return (
        <div class="view">LabelView</div>
      );
    }
  });

  return component;
};

export default LabelView;
