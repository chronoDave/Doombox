import type { ThemeShape } from '../../../../types/shapes/theme.shape';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import setTheme from '../../../state/actions/setTheme';
import InputRadioList from '../../../components/inputRadioList/inputRadioList';
import store from '../../../state/store';

export type AppearanceViewProps = {};

const AppearanceView: Component<AppearanceViewProps> = () => {
  const values: Array<ThemeShape['theme']> = ['dark', 'light', 'system'];
  const component = new forgo.Component<AppearanceViewProps>({
    render() {
      const { theme } = store.get();

      return (
        <div>
          <InputRadioList
            id="theme"
            label="theme"
            value={theme.theme}
            onchange={value => {
              setTheme(value as ThemeShape['theme']);
            }}
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

  return store.subscribe(component, (prev, cur) => (
    prev.theme.theme !== cur.theme.theme
  ));
};

export default AppearanceView;
