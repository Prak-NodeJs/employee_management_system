import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { storeContext } from '../../context/context';

export const Header = () => {
  const { authData, setAuthData } = useContext(storeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authData');
    setAuthData(null); 
    navigate('/');
  };

  const handleDashboardRedirect = () => {
    if (authData?.role === 'HR') {
      navigate('/hr-dashboard');
    } else if (authData?.role === 'Employee') {
      navigate('/employee-dashboard');
    }
  };

  return (
    <header className="header">
      <div className="header-logo">
        Employee Management
      </div>
      <nav className="header-nav">
        <ul>
          {authData ? (
            <>
              <li><a href="#!" onClick={handleDashboardRedirect}>{authData?.name} ({authData?.role})</a></li>
              <li><a href='#!' onClick={handleLogout}>Logout</a></li>
            </>
          ) : (
            <>
              <li><Link to="/">Login</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
