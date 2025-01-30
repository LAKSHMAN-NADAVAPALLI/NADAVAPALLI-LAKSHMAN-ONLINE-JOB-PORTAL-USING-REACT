import React from "react";
import "./About.css"; // Import the CSS file

const About = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About Our Job Portal</h1>
        <p>Your career starts here – connecting talent with opportunities.</p>
      </header>

      <section className="about-section">
        <div className="about-text">
          <h2>Who We Are</h2>
          <p>
            Our AI-powered job portal helps job seekers find the best job
            opportunities tailored to their skills and experience. We bridge
            the gap between employers and job seekers through an intelligent
            matching system.
          </p>
        </div>
        <img
          src="/images/job-search.png"
          alt="Job Search"
          className="about-image"
        />
      </section>

      <section className="about-mission">
        <h2>Our Mission</h2>
        <p>
          To create a seamless and efficient hiring experience using AI-driven
          technology, making recruitment faster and more effective.
        </p>
      </section>

      <section className="about-features">
        <h2>Why Choose Us?</h2>
        <div className="feature-box">
          <div className="feature">
            <h3>AI-Powered Matching</h3>
            <p>Find the perfect job based on your skills and interests.</p>
          </div>
          <div className="feature">
            <h3>Resume Parsing</h3>
            <p>Upload your resume, and we’ll analyze it to suggest jobs.</p>
          </div>
          <div className="feature">
            <h3>Real-Time Job Alerts</h3>
            <p>Get notified instantly when relevant jobs are posted.</p>
          </div>
        </div>
      </section>

      <section className="about-contact">
        <h2>Contact Us</h2>
        <p>Email: support@jobportal.com</p>
        <p>Phone: +1 234 567 890</p>
      </section>
    </div>
  );
};

export default About;
