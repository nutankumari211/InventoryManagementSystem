import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    fullName: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('User registered successfully');
      } else {
        console.error('Failed to register user');
      }
      navigate('/login');
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="register-container">
      <h2>User Registration</h2>
      <form>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="button" onClick={handleRegister}>Register</button>
      </form>
    </div>
  );
};

export default Register;
