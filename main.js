const electron      = require('electron');
const app           = electron.app;
const BrowserWindow = electron.BrowserWindow;

app.on('ready', () => {
    console.log('hello world');

    window = new BrowserWindow({ height: 600, width: 800 });
    window.loadURL(`file://${__dirname}/index.html`);
});