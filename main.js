const { app, BrowserWindow, dialog } = require('electron');
const fs = require('fs');

let mainWindow = null; // Prevents window from being garbage collected

app.on('ready', () => {
    
    mainWindow = new BrowserWindow({ 
        height: 600, 
        width: 800,
        show: false,
    });
    
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    
    mainWindow.on('ready-to-show', () => {
        mainWindow.show(); // Show when window is ready
    });

    mainWindow.on('closed', () => mainWindow = null); // Clean up after we're done
});

const getFile = () => {
    const files = dialog.showOpenDialog(mainWindow, {
        properties: ['openFile'],
        filters: [
            { name: 'Your Text Files', extensions: ['txt', 'text'] },
            { name: 'Your Markdown Files', extensions: ['md', 'markdown'] },
        ]
    });

    if(!files) {
        return;
    } 

    const content = fs.readFileSync(files[0]).toString();
    console.log(content);
};

exports.getFile = getFile;