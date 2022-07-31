import fs from 'fs';

import App from './lib/app';

if (App.isDev) {
  fs.mkdirSync(App.dir.assets, { recursive: true });
  fs.mkdirSync(App.dir.userData, { recursive: true });
}

App.run();
