import type { ForgoNewComponentCtor as Component } from 'forgo';
import type { ThemeShape } from '../../../../types/shapes/theme.shape';

import * as forgo from 'forgo';

import * as state from '../../../state/state';
import InputRadio from '../../../components/input/radio/input.radio';

export type AppearanceViewProps = {};

const AppearanceView: Component<AppearanceViewProps> = () => {
  const values: ThemeShape['theme'][] = ['dark', 'light', 'system'];
  const component = new forgo.Component<AppearanceViewProps>({
    render() {
      return (
        <div>
          <InputRadio
            id="theme"
            label="theme"
            value={state.theme.shape.theme}
            onchange={value => state.actions.theme.setThemeType(value as ThemeShape['theme'])}
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
