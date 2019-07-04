import { BrowserWindow } from 'electron';

export const createWindow = () => {
  let window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  switch (process.env.NODE_ENV) {
    case 'development':
      window.loadURL('http://localhost:5000');
      break;
    case 'production':
      // Build must be either grouped with React, or must load an external URL
      break;
    default:
      // Fallback
      break;
  }

  window.on('closed', () => {
    window = null;
  });
};
