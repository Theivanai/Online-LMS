// const express = require('express');
// const multer = require('multer');
// const path = require('path');

// const router = express.Router();

// // Storage configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'Uploads/'); // Uploads folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // unique filename
//   },
// });



// // File filter (optional - restrict file types)
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/jfif'];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Invalid file type'), false);
//   }
// };

// // Multer middleware
// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
// });

// // Route for uploading multiple file
// router.post('/upload', upload.array('images', 15), (req, res) => {
//   const filenames = req.files.map(file => file.filename);
//   res.status(200).json({
//     filenames,
//     message: 'Files uploaded successfully'
//   });
// });

// //update book with image
// router.put('/api/books/:id', upload.single('image'), async (req, res) => {
//   const updateData = req.body;

//   if (req.file) {
//     updateData.image = `/uploads/${req.file.filename}`;
//   }

//   try {
//     const updated = await Book.findByIdAndUpdate(req.params.id, updateData, { new: true });
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to update book' });
//   }
// });

// module.exports = router;


// const multer = require('multer');
// // const path = require('path');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');  // ensure folder exists
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/jfif'];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Invalid file type'), false);
//   }
// };

// const upload = multer({ storage, fileFilter });

// module.exports = upload;


// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// //ensure uploads/profileimages folder exists
// const uploadDir = `uploads/profileimages/`;
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// //storage settings
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     const baseName = path.basename(file.originalname, ext).replace(/\s+/g, '-');
//     cb(null, Date.now() + '-' + baseName + ext);
//   },
// });


// //Allowed image types
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/jfif'];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only JPEG, PNG, JPG, and JFIF files are allowed'), false);
//   }
// };


// //combine everything with limits
// const upload = multer({
//   storage, fileFilter, limits: { fileSize: 2 * 1024 * 1024 },
// });
// module.exports = upload;


// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// // Use 'uploads/' instead of 'uploads/profileimages/' to match frontend
// const uploadDir = 'uploads/';
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname).toLowerCase();
//     const baseName = path.basename(file.originalname, ext)
//       .replace(/\s+/g, '-')
//       .replace(/[^a-zA-Z0-9-]/g, '');
//     cb(null, `${Date.now()}-${baseName}${ext}`);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/jfif'];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Invalid file type. Only JPEG, PNG, JPG, and JFIF files are allowed'), false);
//   }
// };

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: {
//     fileSize: 2 * 1024 * 1024,
//     files: 1 // Limit to single file uploads
//   }
// });

// module.exports = upload;




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