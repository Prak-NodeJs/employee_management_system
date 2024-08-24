import React from 'react';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Employee Management System. All rights reserved.</p>
    </footer>
  );
};
