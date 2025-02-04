const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const connectDB = require('./db');
const errorHandler = require('./middlewares/errorHandler');
const authRoutes = require('./routes/authRoutes');
const jslRoutes = require('./routes/jslRoutes');
const adminRoutes = require('./routes/adminRoutes'); 
const adminController = require('./controllers/adminController'); 

const app = express();

// Middleware
app.use(express.json());
const allowedOrigins = [process.env.FRONTEND_URL || 'http://localhost:3000'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}));

app.use(cookieParser());
app.use(helmet());
app.use(morgan('dev'));

// Disable caching globally
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

// API Routes
app.use('/api/employer', authRoutes);
app.use('/api/jobseeker', jslRoutes);
app.use('/api/admin', adminRoutes);
app.post('/api/admin/login-otp', adminController.loginWithOtp);  
app.post('/api/admin/login-password', adminController.loginWithPassword);  

// Static file serving for uploads (e.g., profile pictures, resumes)
app.use('/uploads', express.static('uploads'));

// Error Handling Middleware
app.use(errorHandler);

// Remove frontend serving logic because frontend is deployed separately

const startServer = async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT || 5001, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5001}`);
    });
  } catch (error) {
    console.error('Error starting server:', error.message);
  }
};

startServer();

process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  process.exit();
});
