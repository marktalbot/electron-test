const { remote, ipcRenderer } = require('electron');
const mainProcess             = remote.require('./main');
const thisCurrentWindow       = remote.getCurrentWindow(); // Reference to current window
const marked                  = require('marked');

const newFileButton     = document.querySelector('#new-file');
const openFileButton    = document.querySelector('#open-file');
const revertButton      = document.querySelector('#revert');
const saveHtmlButton    = document.querySelector('#save-html');
const markdownContainer = document.querySelector('#markdown');
const htmlContainer     = document.querySelector('#html');

const renderMarkdownToHtml = (markdown) => {
    htmlContainer.innerHTML = marked(markdown, { sanitize: true });
};

newFileButton.addEventListener('click', () => {
    mainProcess.createWindow();
});

openFileButton.addEventListener('click', () => {
    mainProcess.openFile(thisCurrentWindow);
});

markdownContainer.addEventListener('keyup', (event) => {
    renderMarkdownToHtml(event.target.value);
});

// Listening for custom 'file-opened' event and getting file and content...
// ...think of 'file-opened' as the chanel we want to listen to.
ipcRenderer.on('file-opened', (event, file, content) => {
    markdownContainer.value = content;
    renderMarkdownToHtml(content);
});