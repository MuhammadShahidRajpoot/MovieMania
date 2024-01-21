const multer = require('multer');
const path = require('path');
const currentDir = __dirname;
const parentDir = path.dirname(currentDir);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, parentDir + '/assets/');
    },
    filename: (req, file, cb) => {
        const fileName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
        req.fileName=fileName;
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

module.exports = { upload };