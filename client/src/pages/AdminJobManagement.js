import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminJobManagement.css';

const API_BASE = 'https://nadavapalli-lakshman-online-job-portal.onrender.com/api/admin/jobs';

const AdminJobManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
  });
  const [editingJob, setEditingJob] = useState(null);
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(API_BASE);
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      alert(error.response?.data?.message || 'Failed to fetch jobs.');
    } finally {
      setLoading(false);
    }
  };

  const fetchApplicants = async (id) => {
    setApplicants([]);
    try {
      const { data } = await axios.get(`${API_BASE}/${id}/applicants`);
      setApplicants(data.applicants || []);
    } catch (error) {
      console.error('Error fetching applicants:', error);
      alert(error.response?.data?.message || 'Failed to fetch applicants.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitJob = async () => {
    if (!formData.title || !formData.description || !formData.location || !formData.salary) {
      alert('All fields are required.');
      return;
    }

    setLoading(true);
    try {
      if (editingJob && editingJob._id) {
        // Update job
        const { data } = await axios.patch(`${API_BASE}/${editingJob._id}`, formData);
        setJobs((prev) => prev.map((job) => (job._id === editingJob._id ? data : job)));
        alert('Job updated successfully.');
      } else {
        // Add job
        const { data } = await axios.post(API_BASE, formData);
        setJobs((prev) => [...prev, data]);
        alert('Job added successfully.');
      }

      resetForm();
    } catch (error) {
      console.error('Error saving job:', error);
      alert(error.response?.data?.message || 'Failed to save job.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;

    setLoading(true);
    try {
      await axios.delete(`${API_BASE}/${id}`);
      setJobs((prev) => prev.filter((job) => job._id !== id));
      alert('Job deleted successfully.');
    } catch (error) {
      console.error('Error deleting job:', error);
      alert(error.response?.data?.message || 'Failed to delete job.');
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (job) => {
    setEditingJob(job);
    setFormData({
      title: job.title || '',
      description: job.description || '',
      location: job.location || '',
      salary: job.salary || '',
    });
  };

  const resetForm = () => {
    setEditingJob(null);
    setFormData({ title: '', description: '', location: '', salary: '' });
  };

  return (
    <div className="admin-job-management">
      <h2>Admin Job Management</h2>

      <div className="form-container">
        <h3>{editingJob ? 'Edit Job' : 'Add Job'}</h3>
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Job Location"
          value={formData.location}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="salary"
          placeholder="Job Salary"
          value={formData.salary}
          onChange={handleInputChange}
        />
        <div>
          <button onClick={handleSubmitJob} disabled={loading}>
            {editingJob ? 'Update Job' : 'Add Job'}
          </button>
          {editingJob && (
            <button onClick={resetForm} style={{ marginLeft: '10px' }}>
              Cancel
            </button>
          )}
        </div>
      </div>

      <h3>Jobs</h3>
      {loading ? (
        <p>Loading...</p>
      ) : jobs.length > 0 ? (
        <ul>
          {jobs.map((job) => (
            <li key={job._id}>
              <strong>{job.title}</strong> - {job.location}
              <p>Salary: ${job.salary}</p>
              <p>{job.description}</p>
              <button onClick={() => startEditing(job)}>Edit</button>
              <button onClick={() => handleDeleteJob(job._id)} className="delete">
                Delete
              </button>
              <button onClick={() => fetchApplicants(job._id)} className="view-applicants">
                View Applicants
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No jobs available.</p>
      )}

      {applicants.length > 0 && (
        <div className="applicants-list">
          <h3>Applicants</h3>
          <ul>
            {applicants.map((applicant, index) => (
              <li key={index}>
                <p>Name: {applicant.name}</p>
                <p>Email: {applicant.email}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminJobManagement;
