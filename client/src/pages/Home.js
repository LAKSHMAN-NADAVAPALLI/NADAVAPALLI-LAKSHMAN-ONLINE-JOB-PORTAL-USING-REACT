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
    const routes = {
      admin: '/admin/login',
      employer: '/employer/login',
      jobseeker: '/jobseeker/login'
    };
    navigate(routes[role]);
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
          <div className="hero-content">
            <h1>🚀 Your Career, Supercharged</h1>
            <p>
              Discover top opportunities, connect with employers, and land your dream job 
              with AI-powered recommendations & market insights.
            </p>
            <div className="role-buttons">
              <button className="role-button admin" onClick={() => handleRoleChange('admin')}>Admin</button>
              <button className="role-button employer" onClick={() => handleRoleChange('employer')}>Employer</button>
              <button className="role-button jobseeker" onClick={() => handleRoleChange('jobseeker')}>Job Seeker</button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <h2>✨ Why Choose Our Platform?</h2>
          <div className="features-grid">
            {[
              {
                title: "🔍 AI-Powered Job Matching",
                desc: "Get jobs that perfectly match your skills, experience, and career goals — powered by intelligent algorithms."
              },
              {
                title: "📊 Real-Time Market Insights",
                desc: "Stay updated with salary trends, demand analysis, and growth forecasts in your industry."
              },
              {
                title: "⚡ Quick Apply",
                desc: "Apply to multiple jobs in one click, saving you valuable time and increasing your chances."
              },
              {
                title: "🤝 Networking Opportunities",
                desc: "Connect directly with hiring managers and industry leaders to boost your career."
              },
              {
                title: "🌎 Global Reach",
                desc: "Explore remote and international job opportunities across various domains."
              },
              {
                title: "🔒 Secure & Private",
                desc: "Your personal data is safe with end-to-end encryption and secure access control."
              }
            ].map((feature, index) => (
              <div className="feature-card" key={index}>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <h2>📈 Our Impact</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>50K+</h3>
              <p>Active Job Listings</p>
            </div>
            <div className="stat-card">
              <h3>120K+</h3>
              <p>Successful Hires</p>
            </div>
            <div className="stat-card">
              <h3>500+</h3>
              <p>Partner Companies</p>
            </div>
          </div>
        </section>

        {/* Image Section */}
        <section className="image-section">
          <h2>Explore Opportunities</h2>
          <div className="job-images">
            {[job1, job2, job3, job4].map((img, i) => (
              <img key={i} src={img} alt={`Job ${i+1}`} className="job-image" onClick={handleImageClick} />
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials-section">
          <h2>💬 What People Say</h2>
          <div className="testimonials-grid">
  <div className="testimonial-card">
    <p>
      "This platform helped me land my dream job within 2 weeks! The AI recommendations were spot on."
    </p>
    <h4>- Surya M.</h4>
  </div>
  <div className="testimonial-card">
    <p>
      "As an employer, the quick apply and candidate matching system saved us hours of screening time."
    </p>
    <h4>- David R.</h4>
  </div>
  <div className="testimonial-card">
    <p>
      "The interface is so clean and easy to use. I found multiple job opportunities without feeling overwhelmed."
    </p>
    <h4>- Priya S.</h4>
  </div>
  <div className="testimonial-card">
    <p>
      "I’ve tried several job portals, but this one is the most efficient. The skill-based search is a game changer."
    </p>
    <h4>-  Aravind T.</h4>
    </div>
   </div>
  </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;
