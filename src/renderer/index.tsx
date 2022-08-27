import * as forgo from 'forgo';

import { setTheme } from './ipc/theme';
import { TitleBar } from './modules/titleBar/titleBar';

const values = [
  'system',
  'dark',
  'light'
] as const;

forgo.mount([
  <TitleBar />,
  <main>
    Main!
    <select
      name='theme'
      onchange={event => setTheme('theme', event.currentTarget.value as typeof values[number])}
    >
      {values.map(value => <option value={value} key={value}>{value}</option>)}
    </select>
    <button type='button'>
      Click me
    </button>
  </main>
], document.body);
