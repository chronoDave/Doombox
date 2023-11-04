import type { ThemeShape } from '../../../types/shapes/theme.shape';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import produce from 'immer';

import Label from '../../components/label/label';
import Select from '../../components/select/select';
import { setTheme } from '../../state/actions/theme.actions';
import { themeSelector } from '../../state/selectors/theme.selectors';

import './settingsAppearance.scss';

export type SettingsAppearanceProps = {};

const SettingsAppearance: Component<SettingsAppearanceProps> = () => {
  const component = new forgo.Component<SettingsAppearanceProps>({
    render() {
      const theme = themeSelector.get();

      return (
        <div class='SettingsAppearance'>
          <Label title='Theme'>
            <Select
              id='theme'
              value={theme}
              onChange={value => setTheme(produce(draft => {
                draft.theme = value as ThemeShape['theme'];
              }))}
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

  themeSelector.subscribe(component);

  return component;
};

export default SettingsAppearance;
