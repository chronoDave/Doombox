import { app, BrowserWindow, Notification } from 'electron';
import { autoUpdater } from 'electron-updater';
import path from 'path';

app.on('ready', () => {
  const window = new BrowserWindow();

  const createNotif = (body: string) => new Notification({ title: 'Update', body }).show();

  window.show();
  autoUpdater.updateConfigPath = path.join(__dirname, '../../build/dev-app-update.yml');
  autoUpdater.checkForUpdates();

  createNotif('hey');

  autoUpdater.on('checking-for-update', () => {
    createNotif('checking-for-update');
  });

  autoUpdater.on('update-available', info => {
    createNotif(info);
  });

  autoUpdater.on('update-not-available', info => {
    createNotif(info);
  });

  autoUpdater.on('update-not-available', err => {
    createNotif(err.message);
  });
});

app.on('window-all-closed', () => {
  app.quit();
});
