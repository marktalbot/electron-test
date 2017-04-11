const { remote }  = require('electron');
const { getFile } = remote.require('./main');
const os          = require('os');
const fs          = require('fs');

const files          = fs.readdirSync(os.homedir()); // Getting files from home dir
const fileList       = document.querySelector('#file-list');
const openFileButton = document.querySelector('#open-file-btn');

files.filter(name => name.charAt(0) !== '.')
    .forEach(name => {
        let fileListItem         = document.createElement('li'); // Adding elements to DOM
        fileListItem.textContent = name;
        fileList.appendChild(fileListItem);
    }
);

openFileButton.addEventListener('click', () => {
    getFile();
});