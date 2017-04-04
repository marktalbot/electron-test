const electron      = require('electron');
const app           = electron.app;
const BrowserWindow = electron.BrowserWindow;

let window = null; // Prevents window from being garbage collected

app.on('ready', () => {
    window = new BrowserWindow({ 
        height: 600, 
        width: 800,
        show: false,
    });
    
    window.on('closed', () => window = null); // Clean up after we're done

    window.on('ready-to-show', () => {
        window.show(); // Show when window is ready
    });

    window.loadURL(`file://${__dirname}/index.html`);
});