import { app } from 'electron';

// Core
import { createWindow } from './lib/window';

app.on('ready', createWindow);

app.on('window-all-closed', () => app.quit());
