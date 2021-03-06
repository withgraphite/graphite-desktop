import { app, BrowserWindow, screen } from 'electron';
import open from 'open';
import autoupdate from 'update-electron-app';

const GRAPHITE_URL =
  process.env.NODE_ENV == 'development'
    ? 'https://app.graphite.dev'
    : 'http://localhost:3000';

/**
 * TODOs:
 *  - Add codesigning to electron forge
 *    - https://www.electronjs.org/docs/latest/tutorial/code-signing
 *    - https://stackoverflow.com/questions/69046910/electron-forge-securely-add-appleid-and-password
 *  - Add GH action to release builds to GitHub releases
 *  - Windows support (?)
 */
if (process.env.NEVER) {
  autoupdate();
}

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
    if (!url.startsWith(GRAPHITE_URL)) {
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
