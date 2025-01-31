// routes/authRoutes.js

const express = require('express');
const multer = require('multer');
const { 
    register, 
    login, 
    getJobseekerProfile, 
    updateJobseekerProfile, 
    verifytoken,
    applyForJob,
    cancelJobApplication,
    
  } = require('../controllers/jslController');
   
//const protect = require('../middlewares/authMiddleware');
const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);


//router.get('/profile', protect, getEmployerProfile);
router.get('/profile', verifytoken, getJobseekerProfile);

router.put(
  '/profile', 
  verifytoken, 
  async (req, res, next) => {
    try {
      const { name, address, phoneNumber, dob } = req.body;
      let profilePicture = req.body.profilePicture || 'default-placeholder.webp'; // Set default image if not provided

      if (!name || !address || !phoneNumber || !dob) {
        return res.status(400).json({ error: 'All fields (name, address, phoneNumber, dob) are required.' });
      }

      // Update data object
      const updateData = { name, address, phoneNumber, dob, profilePicture };

      // Call the update function from controller
      await updateJobseekerProfile(req, res, updateData);  // Passing the updateData directly for controller use

    } catch (err) {
      console.error('Error updating Jobseeker profile:', err);
      res.status(500).json({ error: 'Server error.' });
    }
  }
);

router.post('/jobs/apply', verifytoken, applyForJob);

// Cancel Job Application (protected route)
router.post('/jobs/cancel', verifytoken, cancelJobApplication);
module.exports = router;
