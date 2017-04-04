const os = require('os');
const fs = require('fs');

const files = fs.readdirSync(os.homedir());

files.filter(name => name.charAt(0) !== '.')
    .forEach(name => {
        let fileItem = document.createElement('li');
        fileItem.textContent = name;
        document.body.appendChild(fileItem);
});