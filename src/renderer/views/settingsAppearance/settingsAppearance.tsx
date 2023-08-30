import type { ThemeShape } from '../../../types/shapes/theme.shape';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import produce from 'immer';

import InputRadioList from '../../components/inputRadioList/inputRadioList';
import { setTheme } from '../../state/actions/theme.actions';
import { themePlayerSelector, themeSelector } from '../../state/selectors/theme.selectors';

import Select, { SelectOption } from '../../components/select/select';
import Label from '../../components/label/label';

import './settingsAppearance.scss';

export type SettingsAppearanceProps = {};

const SettingsAppearance: Component<SettingsAppearanceProps> = () => {
  const component = new forgo.Component<SettingsAppearanceProps>({
    render() {
      const theme = themeSelector.get();
      const themePlayer = themePlayerSelector.get();

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
          <Label title='Album display'>
            <Select
              id='playerCover'
              value={themePlayer.cover}
              onChange={value => setTheme(produce(draft => {
                draft.player.cover = value as ThemeShape['player']['cover'];
              }))}
              options={[
                { value: 'cover', label: 'cover' },
                { value: 'contain', label: 'contain' }
              ]}
            />
          </Label>
        </div>
      );
    }
  });

  themeSelector.subscribe(component);
  themePlayerSelector.subscribe(component);

  return component;
};

export default SettingsAppearance;
