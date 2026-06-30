const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    const isPdf = file.mimetype === 'application/pdf';
    const folder = isPdf ? 'uploads/pdfs' : 'uploads/images';

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
    474
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const baseName = path.basename(file.originalname, ext)
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9-]/g, '');
    cb(null, `${Date.now()}-${baseName}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/jfif',
    'application/pdf'
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, JPG, JFIF, and PDF files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 12 * 1024 * 1024,
    files: 2
  }
});

module.exports = upload;