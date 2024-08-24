import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { storeContext } from '../../context/context';
import './Sidebar.css';

const Sidebar = () => {
  const { authData } = useContext(storeContext);

  const menuItems = authData?.role === 'HR' 
    ? [
        { to: '/profile', text: 'Profile' },
        { to: '/add_user', text: 'Add User' },
        { to: '/leave_requests', text: 'All Leave Requests' },
        { to: '/reimbursement_requests', text: 'Get Reimbursement Requests' },
        { to: '/apply_leave', text: 'Apply Leave' },
        { to: '/apply_reimbursement', text: 'Apply Reimbursement' },
        { to: '/requested_leaves', text: 'Requested Leaves' },
        { to: '/requested_reimbursements', text: 'Requested ReImbursments' }
      ]
    : [
        { to: '/apply_leave', text: 'Apply Leave' },
        { to: '/apply_reimbursement', text: 'Apply Reimbursement' },
        { to: '/profile', text: 'Profile' },
        { to: '/requested_leaves', text: 'Requested Leaves' },
        { to: '/requested_reimbursements', text: 'Requested ReImbursments' }

      ];

  return (
    <div className="sidebar">
      <ul>
        {menuItems.map(item => (
          <li key={item.to}>
            <Link to={item.to}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
