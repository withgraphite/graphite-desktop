import { app, BrowserWindow, screen } from 'electron';
import open from 'open';
import autoupdate from 'update-electron-app';

const GRAPHITE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://app.graphite.dev'
    : 'http://localhost:3000';

const GRAPHITE_API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://api.graphite.dev/v1'
    : 'http://localhost:8000/v1';

const GITHUB_LOGIN_URL = 'https://github.com/session';

autoupdate();

function createWindow() {
  const win = new BrowserWindow({
    ...screen.getPrimaryDisplay().workAreaSize,
    backgroundColor: '#1e1e24',
    icon: __dirname + '/icons.icns',
  });

  win.webContents.setWindowOpenHandler(({ url }) => {
    void open(url);
    return { action: 'deny' };
  });

  win.webContents.on('will-navigate', (event, url) => {
    if (
      !url.startsWith(GRAPHITE_URL) &&
      !url.startsWith(GRAPHITE_API_URL) &&
      !url.startsWith(GITHUB_LOGIN_URL)
    ) {
      event.preventDefault();
      void open(url);
    }
  });

  void win.loadURL(GRAPHITE_URL);
}

void app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

export {};
