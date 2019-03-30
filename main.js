const {
  app,
  BrowserWindow,
  ipcMain,
  Tray,
  Menu,
  globalShortcut
} = require('electron');

let tray = null;
let sobreWindow = null;

ipcMain.on('abrir-janela-sobre', () => {
  if (!sobreWindow) {
    sobreWindow = new BrowserWindow({
      width: 300,
      height: 220,
      alwaysOnTop: true,
      frame: false
    });
    sobreWindow.on('closed', () => {
      sobreWindow = null;
    });
  }
  sobreWindow.loadURL(`file://${__dirname}/app/sobre.html`);
});

let mainWindow = null;
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });

  globalShortcut.register('CmdOrCtrl+Shift+A', () => {
    mainWindow.send('atalho-global-a');
  });

  tray = new Tray(__dirname + '/app/icon-tray.png');
  let trayMenu = Menu.buildFromTemplate([
    { label: 'Teste1', type: 'radio', click: () => console.log('first') },
    { label: 'Teste2', type: 'radio', click: () => console.log('second') }
  ]);

  tray.setContextMenu(trayMenu);

  mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

app.on('window-all-closed', () => {
  app.quit();
});
