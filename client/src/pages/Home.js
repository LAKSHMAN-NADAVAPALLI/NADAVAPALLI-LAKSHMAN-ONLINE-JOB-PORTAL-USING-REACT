import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './home.css';
import job1 from '../assets/job1.webp';
import job2 from '../assets/job2.jpg';
import job3 from '../assets/job3.jpg';
import job4 from '../assets/job4.webp';

const Home = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Home - Job Portal';
    document.body.className = 'home-page';
    return () => {
      document.body.className = '';
    };
  }, []);

  const handleRoleChange = (role) => {
    setRole(role);
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
        <section className="hero-section">
          <h1>Welcome to the Job Portal Home Page</h1>
          <p>Find Your Dream Job Today!</p>
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

        {/* Image Section */}
        <section className="image-section">
          <img src={job1} alt="Job 1" className="job-image" onClick={handleImageClick} />
          <img src={job2} alt="Job 2" className="job-image" onClick={handleImageClick} />
          <img src={job3} alt="Job 3" className="job-image" onClick={handleImageClick} />
          <img src={job4} alt="Job 4" className="job-image" onClick={handleImageClick} />
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;
