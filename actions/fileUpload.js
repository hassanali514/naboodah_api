const fs = require('fs');
const multer = require('multer');

const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    // console.log("File name : " + Date.now() + file.originalname);
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload1 = multer({
  storage: storage1,
  limits: {fileSize: 1024 * 1024 * 10}, // maximum file size allowed is 10 MB
  // fileFilter: imageFileFilter
});

module.exports.uploadDocument = upload1;