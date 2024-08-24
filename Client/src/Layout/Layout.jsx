import React, { useEffect } from 'react';
import './Layout.css'; 
import Sidebar from '../componenets/Sidebar/Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { storeContext } from '../context/context';

const Layout = () => {
  const {authData} = useContext(storeContext)
  const navigate = useNavigate()
  useEffect(()=>{
    if(!authData.token){
      navigate('/login')
    }
  })
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="layout-content">
      <Outlet></Outlet>
      </div>
    </div>
  );
};



export default Layout;
