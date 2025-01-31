import React, { useState, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import "./JobseekerDashboard.css";

const JobseekerDashboard = () => {
  const [jobseekerData, setJobseekerData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    education: "",
    dob: "",
    address: "",
    profilePicture: "default-placeholder.webp", // Default image
    applications: [],
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profilePicture] = useState(null);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("User not logged in.");
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const email = decoded.email;
      setJobseekerData((prevState) => ({ ...prevState, email }));
      fetchJobseekerProfile(email, token);
    } catch (err) {
      console.error("Invalid token:", err);
      setError("Invalid or expired token.");
      setLoading(false);
    }
  }, []);

  const fetchJobseekerProfile = async (email, token) => {
    try {
      const response = await axios.get("http://localhost:5001/api/jobseeker/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobseekerData(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("Failed to load profile.");
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const formData = new FormData();
      formData.append("name", jobseekerData.name);
      if (profilePicture) formData.append("profilePicture", profilePicture); // Keep default picture
      formData.append("dob", jobseekerData.dob);
      formData.append("address", jobseekerData.address);
      formData.append("phoneNumber", jobseekerData.phoneNumber);

      const response = await axios.put(
        "http://localhost:5001/api/jobseeker/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Profile updated successfully!");
      setJobseekerData(response.data);
      setEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobseekerData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleFileChange = (e) => {
    <p>No photo selected. Default image is used.</p>
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="dashboard-container">
      <div className="profile-section">
        <div className="profile-picture-container">
          <img
            src={`http://localhost:5001/uploads/${jobseekerData.profilePicture}`}
            alt="Profile"
            className="profile-picture"
          />
        </div>
        <h2>Jobseeker Dashboard</h2>
        {!editing ? (
          <div>
            <h3>Welcome, {jobseekerData.name || "Jobseeker"}</h3>
            <p>Email: {jobseekerData.email || "Not provided"}</p>
            <button onClick={() => setEditing(true)} className="edit-profile-btn">
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleUpdateProfile}>
            <div>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={jobseekerData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={jobseekerData.email}
                disabled
              />
            </div>
            <div>
            <label>Profile Picture</label>
            <input
              type="file"
              name="profilePicture"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
            <div>
              <label>Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={jobseekerData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={jobseekerData.dob}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={jobseekerData.address}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Save Changes</button>
            <button
              type="button"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default JobseekerDashboard;
