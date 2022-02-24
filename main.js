const path = require('path');

const { app, BrowserWindow, Menu } = require('electron');


app.whenReady().then(() => {
  const win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'bundle/app.js'),
    },
  });
  win.loadFile('index.html');
});

Menu.setApplicationMenu(Menu.buildFromTemplate([
  { role: 'viewMenu' },
  { role: 'windowMenu' },
]));

app.on('window-all-closed', () => {
  app.quit();
});

/* vim: set ts=2 sw=2 et : */
