const express = require('express');
const { 
  register, 
  login, 
  getEmployerProfile, 
  updateEmployerProfile, 
  verifyToken 
} = require('../controllers/authController');
 // Import multer config for file uploads
const router = express.Router();
const multer = require('multer');  // Make sure this line is added


// Routes for Registration and Login
router.post('/register', register);
router.post('/login', login);

// Route to Get Employer Profile (Protected)
const storage = multer.diskStorage({
  destination: './uploads/', // Destination folder for uploaded files
  filename: (req, file, cb) => {
    // Ensure unique filenames by prepending the timestamp
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File type validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

// Multer upload configuration
const upload = multer({
  storage,
  fileFilter,
}).single('profilePicture'); // Use 'profilePicture' as the field name

// Middleware to handle profile picture upload
const handleProfilePictureUpload = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    if (!req.file) {
      req.body.profilePicture = 'default-placeholder.webp'; // Default placeholder if no file is uploaded
    } else {
      req.body.profilePicture = req.file.filename; // Set the uploaded image path
    }

    next();
  });
};

// Route to update employer profile

// Route to update employer profile
router.put(
  '/profile', 
  verifyToken, 
  handleProfilePictureUpload, // Multer middleware to handle profile picture upload
  updateEmployerProfile // Controller to handle profile updates
);

// Route to get employer profile
router.get('/profile', verifyToken, getEmployerProfile);


module.exports = router;
