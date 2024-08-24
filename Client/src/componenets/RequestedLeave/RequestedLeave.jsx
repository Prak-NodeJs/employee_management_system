import React, { useEffect, useState, useContext } from 'react';
import './RequestedLeave.css';
import { storeContext } from '../../context/context';

const RequestedLeave = () => {
  const { authData } = useContext(storeContext);
  const [requestedLeaves, setRequestedLeaves] = useState([]);

  useEffect(() => {
    const fetchRequestedLeaves = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/requested/leaves`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authData?.token}`
          }
        });

        const data = await response.json();

        if (data.success) {
          setRequestedLeaves(data.data);
        } else {
          console.error('Failed to fetch requested leaves:', data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchRequestedLeaves();
  }, [authData?.token]);

  return (
    <div className="requested-leave-container">
      <h2>Requested Leaves</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Leave Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {requestedLeaves.flatMap(user =>
            user.leaves.map(leave => (
              <tr key={leave.id}>
                <td>{leave.id}</td>
                <td>{new Date(leave.start_date).toLocaleDateString()}</td>
                <td>{new Date(leave.end_date).toLocaleDateString()}</td>
                <td>{leave.leave_type}</td>
                <td>{leave.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RequestedLeave;
