import type { ThemeShape } from '../../../types/shapes/theme.shape';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import produce from 'immer';

import InputRadioList from '../../components/inputRadioList/inputRadioList';
import { setTheme } from '../../state/actions/theme.actions';
import { themePlayerSelector, themeSelector } from '../../state/selectors/theme.selectors';

import './settingsAppearance.scss';

export type SettingsAppearanceProps = {};

const SettingsAppearance: Component<SettingsAppearanceProps> = () => {
  const component = new forgo.Component<SettingsAppearanceProps>({
    render() {
      const theme = themeSelector.get();
      const themePlayer = themePlayerSelector.get();

      return (
        <div>
          <InputRadioList
            id="theme"
            label="theme"
            value={theme}
            onchange={value => setTheme(produce(draft => {
              draft.theme = value as ThemeShape['theme'];
            }))}
            options={['dark', 'light', 'system'].map(value => ({
              id: value,
              value,
              label: value
            }))}
          />
          <InputRadioList
            id="player.cover"
            label="player.cover"
            value={themePlayer.cover}
            onchange={value => setTheme(produce(draft => {
              draft.player.cover = value as ThemeShape['player']['cover'];
            }))}
            options={['cover', 'contain'].map(value => ({
              id: value,
              value,
              label: value
            }))}
          />
        </div>
      );
    }
  });

  themeSelector.subscribe(component);
  themePlayerSelector.subscribe(component);

  return component;
};

export default SettingsAppearance;
