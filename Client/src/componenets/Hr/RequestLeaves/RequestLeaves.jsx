import React, { useEffect, useState, useContext } from 'react';
import './RequestLeaves.css'; 
import { storeContext } from '../../../context/context';

const RequestLeaves = () => {
  const { authData } = useContext(storeContext);
  const [leaveRequests, setLeaveRequests] = useState([]);


  const fetchLeaveRequests = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/leave/requests`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authData?.token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setLeaveRequests(data.data);
      } else {
        console.error('Failed to fetch leave requests:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
 
    fetchLeaveRequests();
  }, [authData?.token, fetchLeaveRequests]);

  const updateLeaveStatus = async (userId, leaveId, status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/leave/${leaveId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${authData?.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });

      const data = await response.json();

      if (data.success) {
        fetchLeaveRequests();
      } else {
        console.error(`Failed to update leave status:`, data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAccept = (userId, leaveId) => {
    updateLeaveStatus(userId, leaveId, 'Accepted');
  };

  const handleReject = (userId, leaveId) => {
    updateLeaveStatus(userId, leaveId, 'Rejected');
  };

  return (
    <div className="request-leaves-container">
      <h2>Leave Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Reason</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map(user => 
            user.leaves.map(leave => (
              <tr key={leave.id}>
                <td>{user.name}</td>
                <td>{leave.leave_type}</td>
                <td>{new Date(leave.start_date).toLocaleDateString()}</td>
                <td>{new Date(leave.end_date).toLocaleDateString()}</td>
                <td>{leave.status}</td>
                <td>{leave.reason}</td>

                <td>
                  <button onClick={() => handleAccept(user.id, leave.id)}>Accept</button>
                  <button onClick={() => handleReject(user.id, leave.id)}>Reject</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RequestLeaves;
