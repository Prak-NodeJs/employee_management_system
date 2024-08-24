import React, { useState, useContext, useEffect } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { storeContext } from '../../context/context';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const { authData, setAuthData } = useContext(storeContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authData?.role) {
      if (authData.role === 'HR') {
        navigate('/hr-dashboard');
      } else {
        navigate('/employee-dashboard');
      }
    }
  }, [authData, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        const userData = {
          id: data.data.id,
          name: data.data.name,
          email: data.data.email,
          role: data.data.role,
          token: data.data.token,
        };

        setAuthData(userData);
        localStorage.setItem('authData', JSON.stringify(userData)); 

        if (data.data.role === 'HR') {
          navigate('/hr-dashboard');
        } else {
          navigate('/employee-dashboard');
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="terms-container">
          <input 
            type="checkbox"
            id="terms"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
          />
          <label htmlFor="terms">I accept the terms and conditions</label>
        </div>
        <button type="submit" disabled={!acceptTerms}>Login</button>
      </form>
    </div>
  );
};

export default Login;
