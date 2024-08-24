import React, { useEffect, useState, useContext } from 'react';
import './RequestedReImbursment.css';
import { storeContext } from '../../context/context';

const RequestedReImbursment = () => {
  const { authData } = useContext(storeContext);
  const [reimbursements, setReimbursements] = useState([]);

  useEffect(() => {
    const fetchReimbursements = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/requested/reimbursments`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authData?.token}`
          }
        });

        const data = await response.json();

        if (data.success) {
          setReimbursements(data.data);
        } else {
          console.error('Failed to fetch requested reimbursements:', data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchReimbursements();
  }, [authData?.token]);

  return (
    <div className="requested-reimbursements-container">
      <h2>Requested Reimbursements</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Status</th>
            <th>Attachments</th>
          </tr>
        </thead>
        <tbody>
          {reimbursements.flatMap(user =>
            user.reimbursements.map(reimbursement => (
              <tr key={reimbursement.id}>
                <td>{reimbursement.id}</td>
                <td>${reimbursement.amount}</td>
                <td>{reimbursement.description}</td>
                <td>{reimbursement.status}</td>
                <td>
                  <a href={`http://localhost:5000/images/${reimbursement.pdf_attachment}`} target="_blank" rel="noopener noreferrer">
                    View PDF
                  </a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RequestedReImbursment;
