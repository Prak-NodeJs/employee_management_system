import React, { useContext, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import { storeContext } from '../../context/context';
import './ApplyReimbursmnet.css'

const ApplyReimbursement = () => {
  const [description, setDescription] = useState('');
  const {authData } = useContext(storeContext)
  const [amount, setAmount] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('description', description);
    formData.append('amount', amount);
    formData.append('file', file);

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/apply/reimbusrment`, {
        method: 'POST',
        headers:{
            'Authorization':`Bearer ${authData.token}`
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        navigate('/requested_reimbursements');
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while applying for reimbursement.');
    }
  };

  return (
    <div className="apply-reimbursement-container">
      <h2>Apply for Reimbursement</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="file">PDF Attachment:</label>
          <input
            type="file"
            id="file"
            accept=".pdf"
            onChange={handleFileChange}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Apply Reimbursement</button>
      </form>
    </div>
  );
};

export default ApplyReimbursement;
