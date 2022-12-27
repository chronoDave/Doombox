import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

export type SettingsProps = {};

const Settings: Component<SettingsProps> = () => {
  const component = new forgo.Component<SettingsProps>({
    render() {
      return (
        <div>Settings</div>
      );
    }
  });

  return component;
};

export default Settings;
