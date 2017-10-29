import {app, BrowserWindow} from 'electron';
import path from 'path';
import url from 'url';

// Keep global reference to avoid being garbage collected.
let browser = null;

const createWindow = () => {
  browser = new BrowserWindow();
  browser.loadURL(url.format({
    pathname: path.join(__dirname, 'dashboard.html'),
    protocol: 'file:',
    slashes: true,
  }));

  browser.webContents.openDevTools();

  browser.on('closed', () => {
    browser = null;
  });
};

app.on('ready', createWindow);

app.on('activate', () => {
  if (browser === null) {
    createWindow();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
