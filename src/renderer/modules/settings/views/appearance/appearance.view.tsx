import type { ForgoNewComponentCtor as Component } from 'forgo';
import type { ThemeShape } from '../../../../../types/shapes/theme.shape';

import * as forgo from 'forgo';

import store from '../../../../store/store';
import InputRadio from '../../../../components/inputRadio/input.radio';
import { setTheme } from '../../../../store/actions/theme.actions';

export type AppearanceViewProps = {};

const AppearanceView: Component<AppearanceViewProps> = () => {
  const values: ThemeShape['theme'][] = ['dark', 'light', 'system'];
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
