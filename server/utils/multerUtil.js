const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
  destination ( req, file, cb ) {
    cb(null,'public/upload');
  },
  filename ( req, file, cb ) {
    const filename = file.originalname.split('.');

    const name = file.fieldname + Date.now() + '.' + filename[filename.length - 1]; // 后缀

    cb(null, name);
    // req.file.path = path.join(__dirname,'..','/public/upload/',name)
  }
})

const upload = multer({
  storage
})

module.exports = upload;
