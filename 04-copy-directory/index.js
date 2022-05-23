const fs = require('fs');
fs.stat('./04-copy-directory/files-copy', (error) => {
  if (!error) {
    fs.readdir('./04-copy-directory/files-copy', (error, files) => {
      if (error) throw error;
      files.forEach(file => {
        fs.unlink(`./04-copy-directory/files-copy/${file}`, error => {
          if (error) throw error;
        });
      });
    });
  }
  else if (error.code === 'ENOENT') {
    fs.mkdir('./04-copy-directory/files-copy', error => {
      if (error) throw error;
    });
  }
  fs.readdir('./04-copy-directory/files', (error, files) => {
    files.forEach(file => {
      fs.copyFile(`./04-copy-directory/files/${file}`, `./04-copy-directory/files-copy/${file}`, error => {
        if (error) throw error;
      });
    });
  });
});
console.log('Directory copy finished!');