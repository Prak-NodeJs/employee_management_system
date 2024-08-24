import React, { useEffect, useState, useContext } from 'react';
import './RemebRequests.css';
import { storeContext } from '../../../context/context';

const ReimbursementRequest = () => {
  const { authData } = useContext(storeContext);
  const [reimbursementRequests, setReimbursementRequests] = useState([]);

  const fetchReimbursementRequests = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/reimbursement/requests`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authData?.token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setReimbursementRequests(data.data);
      } else {
        console.error('Failed to fetch reimbursement requests:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchReimbursementRequests();
  }, [authData?.token]);

  const updateReimbursementStatus = async (userId, reimbursementId, status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/reimbursment/${reimbursementId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${authData?.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });

      const data = await response.json();

      if (data.success) {
        fetchReimbursementRequests();
      } else {
        console.error(`Failed to update reimbursement status:`, data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAccept = (userId, reimbursementId) => {
    updateReimbursementStatus(userId, reimbursementId, 'Accepted');
  };

  const handleReject = (userId, reimbursementId) => {
    updateReimbursementStatus(userId, reimbursementId, 'Rejected');
  };

  return (
    <div className="reimbursement-request-container">
      <h2>Reimbursement Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Description</th>
            <th>PDF Attachment</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reimbursementRequests.map(user => 
            user.reimbursements.length > 0 ? user.reimbursements.map(reimbursement => (
              <tr key={reimbursement.id}>
                <td>{user.name}</td>
                <td>${reimbursement.amount}</td>
                <td>{reimbursement.description}</td>
                <td><a href={`http://localhost:5000/images/${reimbursement.pdf_attachment}`} target="_blank" rel="noopener noreferrer">View PDF</a></td>
                <td>{reimbursement.status}</td>
                <td>
                  <button onClick={() => handleAccept(user.id, reimbursement.id)}>Accept</button>
                  <button onClick={() => handleReject(user.id, reimbursement.id)}>Reject</button>
                </td>
              </tr>
            )) : (
              <tr key={user.id}>
                <td colSpan="6">No reimbursements for {user.name}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReimbursementRequest;
