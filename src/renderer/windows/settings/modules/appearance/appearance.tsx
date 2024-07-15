import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Select from '@doombox/components/select/select';

import subscribe, { setTheme } from './appearance.state';

export type AppearanceProps = {};

const Appearance: Component<AppearanceProps> = () => {
  const component = new forgo.Component<AppearanceProps>({
    render() {
      const { theme } = subscribe('Appearance', component);

      return (
        <form>
          <Select
            id='theme'
            label='Theme'
            value={theme}
            onchange={setTheme}
            options={[
              { value: 'dark', label: 'dark' },
              { value: 'light', label: 'light' },
              { value: 'system', label: 'system' }
            ] as const}
          />
        </form>
      );
    }
  });

  return component;
};

export default Appearance;
