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
const path = require('path'); 
const fs = require('fs'); 

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', 
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
app.get("/", (req, res) => {
  res.send("Server is running successfully on Vercel!");
});

// Constants
const PORT = process.env.PORT || 5001;

// Routes
app.use('/api/employer', authRoutes);
app.use('/api/jobseeker', jslRoutes);

// Static file serving with CORP header
app.use('/uploads', (req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
});
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Admin Dashboard Routes
app.use('/api/admin', adminRoutes);
app.post('/api/admin/login-otp', adminController.loginWithOtp);  
app.post('/api/admin/login-password', adminController.loginWithPassword);  

// Error Handling Middleware
app.use(errorHandler);

// Serve static files from React app's build folder
app.use(express.static(path.join(__dirname, 'client/build')));

// React routing - return index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error.message);
  }
};

startServer();

process.on('SIGINT', () => {
  console.log('Shutting down gracefully...');
  process.exit();
});
