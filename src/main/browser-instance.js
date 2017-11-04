import {app, BrowserWindow} from 'electron';
import path from 'path';
import url from 'url';

// Keep global reference to avoid being garbage collected.
let instance = null;

function ensureInstance() {
  if (instance !== null) {
    return;
  }

  instance = new BrowserWindow();
  instance.loadURL(url.format({
    pathname: path.resolve(__dirname, '../renderer/index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  /*eslint-disable*/
  console.log(__dirname);

  instance.on('closed', () => {
    instance = null;
  });

  if (process.env.NODE_ENV !== 'production') {
    instance.webContents.on('devtools-opened', () => {
      instance.focus();
    });
  }
}

app.on('ready', ensureInstance);
app.on('activate', ensureInstance);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
