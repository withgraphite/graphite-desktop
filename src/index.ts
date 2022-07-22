import { app, BrowserWindow, screen } from 'electron';
import autoupdate from 'update-electron-app';

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
    // TODO: Create windows version
    icon: __dirname + '/icons.icns',
  });

  void win.loadURL('https://app.graphite.dev');
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
