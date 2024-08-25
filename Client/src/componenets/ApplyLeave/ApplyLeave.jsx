import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Applyleave.css'
import { storeContext } from '../../context/context';

const ApplyLeave = () => {
  const [startDate, setStartDate] = useState('');
  const { authData } = useContext(storeContext);
  const [endDate, setEndDate] = useState('');
  const [leaveType, setLeaveType] = useState('Casual Leave');
  const [leaveReason, setLeaveReason] = useState('');

  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/apply/leave`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${authData.token}`
        },
        body: JSON.stringify({
          start_date: startDate,
          end_date: endDate,
          leave_type: leaveType,
          reason:leaveReason
        }),
      });

      const data = await response.json();

      if (data.success) {
        navigate('/requested_leaves');
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while applying for leave.');
    }
  };

  return (
    <div className="apply-leave-container">
      <h2>Apply for Leave</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="start-date">Start Date:</label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="end-date">End Date:</label>
          <input
            type="date"
            id="end-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="end-date">Leave Reason:</label>
          <input
            type="text"
            id="end-date"
            value={leaveReason}
            onChange={(e) => setLeaveReason(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="leave-type">Leave Type:</label>
          <select
            id="leave-type"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
          >
            <option value="Casual Leave">Casual Leave</option>
            <option value="Sick Leave">Sick Leave</option>
          </select>
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Apply Leave</button>
      </form>
    </div>
  );
};

export default ApplyLeave;
