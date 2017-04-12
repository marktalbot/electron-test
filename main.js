const { app, BrowserWindow, dialog } = require('electron');
const fs = require('fs');

const windows  = new Set();

const createWindow = () => {
    let newWindow = new BrowserWindow({ show: false });
    windows.add(newWindow); // Add new window to the Set.

    newWindow.loadURL(`file://${__dirname}/index.html`);

    newWindow.on('ready-to-show', () => {
        newWindow.show(); // Show when window is ready
    });

    newWindow.on('closed', () => {
        windows.delete(newWindow); // Delete window from the Set
        newWindow = null; // Clean up after we're done
    });
};

app.on('ready', () => {
    createWindow();
});

const getFile = (currentWindow) => {
    let files = dialog.showOpenDialog(currentWindow, {
        properties: ['openFile'],
        filters: [
            { name: 'Text Files', extensions: ['txt', 'text'] },
            { name: 'Markdown Files', extensions: ['md', 'markdown'] },
        ]
    });

    if(!files) {
        return;
    } 

    return files[0];
};

const openFile = (currentWindow, filePath) => {
    let file    = filePath || getFile(currentWindow); // If no file path, prompt user for file
    let content = fs.readFileSync(file).toString();

    currentWindow.webContents.send('file-opened', file, content);
    currentWindow.setTitle(`${file} - MarkDownr`); // Sets title in window bar
    currentWindow.setRepresentedFilename(file); // Adds file icon in window bar
};

exports.createWindow = createWindow;
exports.openFile     = openFile;