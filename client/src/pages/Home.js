import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './home.css';
import job1 from '../assets/jrec.png';
import job2 from '../assets/jobportal.jpg';
import job3 from '../assets/jobr.png';
import job4 from '../assets/job4.webp';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Home - Job Portal';
    document.body.className = 'home-page';
    return () => {
      document.body.className = '';
    };
  }, []);

  const handleRoleChange = (role) => {
    if (role === 'admin') {
      navigate('/admin/login');
    } else if (role === 'employer') {
      navigate('/employer/login');
    } else if (role === 'jobseeker') {
      navigate('/jobseeker/login');
    }
  };

  const handleImageClick = () => {
    alert('Please login to access this feature');
  };

  return (
    <>
      <Navbar />
      <div className="home-container">
        
        {/* Hero Section */}
        <section className="hero-section">
          <h1>Welcome to the Job Portal</h1>
          <p>Find Your Dream Job Today — Powered by AI & Smart Recommendations</p>
          <div className="role-buttons">
            <button className="role-button admin" onClick={() => handleRoleChange('admin')}>
              Admin
            </button>
            <button className="role-button employer" onClick={() => handleRoleChange('employer')}>
              Employer
            </button>
            <button className="role-button jobseeker" onClick={() => handleRoleChange('jobseeker')}>
              Job Seeker
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <h2>Why Choose Our Platform?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>🔍 AI-Powered Job Matching</h3>
              <p>Our smart recommendation system analyzes your profile and suggests jobs tailored to your skills, location, and career goals.</p>
            </div>
            <div className="feature-card">
              <h3>📊 Real-Time Market Insights</h3>
              <p>Stay ahead with real-time job market trends, salary insights, and demand analysis to make informed career choices.</p>
            </div>
            <div className="feature-card">
              <h3>⚡ Quick Apply</h3>
              <p>Save time with one-click applications and instantly connect with employers looking for talent like you.</p>
            </div>
            <div className="feature-card">
              <h3>🤝 Employer & Candidate Network</h3>
              <p>Build connections with top companies and professionals in your industry to grow your career faster.</p>
            </div>
          </div>
        </section>

        {/* Image Section */}
        <section className="image-section">
          <h2>Explore Opportunities</h2>
          <div className="job-images">
            <img src={job1} alt="Job 1" className="job-image" onClick={handleImageClick} />
            <img src={job2} alt="Job 2" className="job-image" onClick={handleImageClick} />
            <img src={job3} alt="Job 3" className="job-image" onClick={handleImageClick} />
            <img src={job4} alt="Job 4" className="job-image" onClick={handleImageClick} />
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default Home;
