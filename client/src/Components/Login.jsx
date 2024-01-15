import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
     
      console.log('Logging in user:', formData);

      // Assuming login is successful, call the onLogin prop
      if (onLogin) {
        onLogin();
      }

      // Redirect to home page
      navigate('/');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <label>
          Username:
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
