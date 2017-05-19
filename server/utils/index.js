// 一开始使用readdir api来读取文件再导出，导入模块后发现是empty object，因为这个api是异步的。所以换用readdirSync

const fs = require('fs');
const path = require('path');

// fs.readdir(__dirname,(err,files) => {
//   if(err) console.log(err);
//
//   files.forEach( (fileName) => {
//     const file = require(path.join(__dirname,fileName));
//
//     fileName = fileName.split('.')[0];
//     if(fileName !== 'index') {
//       exports[fileName] = file;
//     }
//   })
//
// })
//

const files = fs.readdirSync(__dirname);


files.forEach( (fileName) => {
  const file = require(path.join(__dirname,fileName));

  fileName = fileName.split('.')[0];
  if(fileName !== 'index') {
    exports[fileName] = file;
  }
})
