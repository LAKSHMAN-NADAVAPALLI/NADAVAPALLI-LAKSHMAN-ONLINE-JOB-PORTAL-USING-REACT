import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminLogin.css';

const AdminLogin = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = 'admin-login-page';
    return () => {
      document.body.className = '';
    };
  }, []);

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(
        'https://nadavapalli-lakshman-online-job-portal.onrender.com/api/admin/login-password',
        { emailOrPhone, password }
      );
      alert(response.data.message || 'Login successful');
      navigate('/admin-dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="adminlogin-containerad">
      <header className="header">
        <h1>Admin Login</h1>
      </header>

      <div className="form-containerad">
        <h2>Welcome to Admin Login</h2>

        <form className="login-formad" onSubmit={handlePasswordLogin}>
          <div className="Ainput-group">
            <label htmlFor="" className="Ainput-label">
              Email or Phone
            </label>
            <input
              id=""
              className="Ainput-field"
              type="text"
              placeholder="Enter Email"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              required
            />
          </div>

          <div className="Ainput-group">
            <label htmlFor="" className="Ainput-label">
              Password
            </label>
            <input
              id="password"
              className="Ainput-field"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-messagead">{error}</p>}

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? (
              <div className="spinner-container">
                <span className="spinner" />
              </div>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;