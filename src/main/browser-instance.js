import {app, BrowserWindow} from 'electron';

// Keep global reference to avoid being garbage collected.
let instance = null;

function ensureInstance() {
  if (instance !== null) {
    return;
  }

  instance = new BrowserWindow();
  if (process.env.NODE_ENV === 'production') {
    instance.loadURL(`file://${__dirname}/index.html`);
  } else {
    instance.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
  }

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
