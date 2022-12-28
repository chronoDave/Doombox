import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

export type AppearanceViewProps = {};

const AppearanceView: Component<AppearanceViewProps> = () => {
  const component = new forgo.Component<AppearanceViewProps>({
    render() {
      return (
        <div>AppearanceView</div>
      );
    }
  });

  return component;
};

export default AppearanceView;
