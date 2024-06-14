import type { ThemeShape } from '@doombox/types/shapes/theme.shape';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Label from '@doombox/components/label/label';
import Select from '@doombox/components/select/select';

import { set } from '../../state/actions/theme';

import subscribe from './appearance.state';

import './appearance.scss';

export type AppearanceProps = {};

const Appearance: Component<AppearanceProps> = () => {
  const component = new forgo.Component<AppearanceProps>({
    render() {
      const { theme } = subscribe('Appearance', component);

      return (
        <div class='Appearance'>
          <Label title='Theme'>
            <Select
              id='theme'
              value={theme}
              onChange={value => set(value as ThemeShape['theme'])}
              options={[
                { value: 'dark', label: 'dark' },
                { value: 'light', label: 'light' },
                { value: 'system', label: 'system' }
              ]}
            />
          </Label>
        </div>
      );
    }
  });

  return component;
};

export default Appearance;
