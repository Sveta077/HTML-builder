const fs = require('fs');
let data = './03-files-in-folder/secret-folder';
let transStr = [];
fs.readdir(data, {withFileTypes: true}, (error, files) => {
  files.forEach(file => {
    if (file.isFile()) {
      fs.stat(data + `/${file.name}`, (error, stats) => {
        transStr = file.name.toString().split('.');
        console.log(transStr[0] + ' - ' + transStr[1] + ' - ' +  (stats.size / 1024) + 'kb');
      });
    }
  });
});