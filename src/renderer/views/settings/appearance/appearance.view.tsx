import type { ThemeShape } from '../../../../types/shapes/theme.shape';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import produce from 'immer';

import InputRadioList from '../../../components/inputRadioList/inputRadioList';
import { setTheme } from '../../../state/actions/theme.actions';
import store from '../../../state/store';

export type AppearanceViewProps = {};

const AppearanceView: Component<AppearanceViewProps> = () => {
  const component = new forgo.Component<AppearanceViewProps>({
    render() {
      const { theme } = store.get();

      return (
        <div>
          <InputRadioList
            id="theme"
            label="theme"
            value={theme.theme}
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
            value={theme.player.cover}
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

  return store.subscribe(component, (prev, cur) => (
    prev.theme.theme !== cur.theme.theme ||
    prev.theme.player.cover !== cur.theme.player.cover
  ));
};

export default AppearanceView;
