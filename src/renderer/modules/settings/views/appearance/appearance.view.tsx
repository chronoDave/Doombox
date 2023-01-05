import type { ThemeShape } from '../../../../../types/shapes/theme.shape';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import InputRadio from '../../../../components/inputRadio/input.radio';
import { setTheme } from '../../../../store/actions/theme.actions';
import store from '../../../../store/store';

export type AppearanceViewProps = {};

const AppearanceView: Component<AppearanceViewProps> = () => {
  const values: Array<ThemeShape['theme']> = ['dark', 'light', 'system'];
  const component = new forgo.Component<AppearanceViewProps>({
    render() {
      const { theme } = store.get();

      return (
        <div>
          <InputRadio
            id="theme"
            label="theme"
            value={theme.theme}
            onchange={value => setTheme(value as ThemeShape['theme'])}
            options={values.map(value => ({
              id: value,
              value,
              label: value
            }))}
          />
        </div>
      );
    }
  });

  return component;
};

export default AppearanceView;
