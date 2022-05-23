const fs = require('fs');
let folder = './05-merge-styles/styles';
let bundle = './05-merge-styles/project-dist/bundle.css';
fs.stat(bundle, (error) => {
  if (!error) {
    fs.unlink(bundle, error => {
      if (error) throw error;
    });
    fs.open(bundle, 'a', (error) => {
      if (error) throw error;
    });
  } else if (error.code === 'ENOENT') {
    fs.open(bundle, 'a', (error) => {
      if (error) throw error;
    });
  }
});
fs.readdir(folder, { withFileTypes: true }, (error, files) => {
  files.forEach((file, i) => {
    if (file.isFile())
     if (file.name.includes('.css')) {
      let stream = fs.ReadStream(`${folder}/${file.name}`);
      stream.on('data', (data) => {
        if (i === 0) {
          fs.appendFile(bundle, `${data}`, () => {});
        } else {
          fs.appendFile(bundle, `\n\n${data}`, () => {});
        }
      });
    }
  });
});
console.log('Bundle.css ready!');