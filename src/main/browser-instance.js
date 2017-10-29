import {app, BrowserWindow} from 'electron';
import path from 'path';
import url from 'url';

// Keep global reference to avoid being garbage collected.
let instance = null;

function createInstance() {
  instance = new BrowserWindow();
  instance.loadURL(url.format({
    pathname: path.join(__dirname, 'dashboard.html'),
    protocol: 'file:',
    slashes: true,
  }));

  instance.on('closed', () => {
    instance = null;
  });
}

app.on('ready', createInstance);

app.on('activate', () => {
  if (instance === null) {
    createInstance();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
