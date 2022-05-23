const fs = require('fs');
const promises = require("fs").promises;
let styleFolder = './06-build-page/styles';
let htmlFile = './06-build-page/template.html';
let styleFile = './06-build-page/project-dist/style.css';
let indexFile = './06-build-page/project-dist/index.html';
fs.mkdir('./06-build-page/project-dist', { recursive: true }, (error) => {
  if (error) throw error;
});
fs.mkdir('./06-build-page/project-dist/assets', { recursive: true }, error => {
  if (error) throw error;
});
fs.writeFile(styleFile, '', (error) => {
  if (error) throw error;
});
fs.open(indexFile, 'a', (error) => {
  if (error) throw error;
});
fs.readdir(styleFolder, { withFileTypes: true }, (error, files) => {
  files.forEach(file => {
    if (file.isFile())
     if (file.name.includes('.css')) {
      fs.readFile(`${styleFolder}/${file.name}`, (error, data) => {
        if (error) throw error;
        fs.appendFile(styleFile, `\n\n${data}`, (error) => {
          if (error) throw error;
        });
      });
    }
  });
});
let arr = ['/fonts', '/img', '/svg'];
arr.forEach(folder => {
  fs.readdir('./06-build-page' + '/assets' + folder, (error, files) => {
    fs.mkdir('./06-build-page/project-dist/assets' + folder, { recursive: true }, error => {
      if (error) throw error;
    });
    files.forEach(file => {
      fs.copyFile('./06-build-page' + '/assets' + folder + `/${file}`, './06-build-page' + `/project-dist/assets${folder}/${file}`, error => {
        if (error) throw error;
      });
    });
  });
});
fs.readFile(htmlFile, (error, buff) => {
  if (error) throw error;
  fs.writeFile(indexFile, buff, (error) => {
    if (error) throw error;
  });
  let stream = fs.ReadStream(indexFile, 'utf-8');
  stream.on('data', async text => {
    let htmlText = text.toString();
    let files = await promises.readdir('./06-build-page' + '/components');
    files.forEach(file => {
      let compStream = fs.ReadStream('./06-build-page' + '/components' + '/' + file,  {encoding:'utf8'});
      compStream.on('data', textFile => {
        let compName = file.split('.')[0];
        let foot = new RegExp(`{{${compName}}}`, 'g');
        htmlText = htmlText.replace(foot, textFile.toString());
      });
      compStream.on('end', () => {
        fs.writeFile(indexFile, htmlText, (error) => {
          if (error) throw error;
        });
      });
    });
  });
});