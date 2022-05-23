const fs = require('fs');
const process = require('process');
fs.open('./02-write-file/text.txt', 'a', (error) => {
  if (error) throw error;
});
console.log('Please add some text:');
process.stdin.on('data', data => {
  if (data.toString() === 'exit\r\n') {
    console.log('Nice to see you!');
    process.exit();
  }
  fs.appendFile('./02-write-file/text.txt', data, (error) => {
    if (error) throw error;
  });
});
process.on('SIGINT', () => {
  console.log('Nice to see you!');
  process.exit();
});