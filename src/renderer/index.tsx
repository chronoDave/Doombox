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
    <button
      type="button"
      onclick={async () => {
        const metadata = await window.ipc.library.scanFull('C:\\Users\\David\\Music\\Finished Music\\かめるかめりあ (KamelCamellia)');
        console.log(metadata);
      }}
    >
      Scan Full
    </button>,
    <button
      type="button"
      onclick={async () => {
        const metadata = await window.ipc.library.scanQuick('C:\\Users\\David\\Music\\Finished Music\\かめるかめりあ (KamelCamellia)');
        console.log(metadata);
      }}
    >
      Scan Quick
    </button>,
    <button type='button'>
      Click me
    </button>
  </main>
], document.body);
