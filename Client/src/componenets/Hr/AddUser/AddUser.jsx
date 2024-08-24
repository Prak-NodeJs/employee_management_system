import React, { useState, useContext } from 'react';
import './AddUser.css'; 
import { storeContext } from './../../../context/context';

export const AddUser = () => {
  const { authData } = useContext(storeContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Employee',
    address: '',
    grade: '',
    job_location: '',
    reporting_manager: '',
    joining_date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/addUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authData?.token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        alert('Successfully added');
        setFormData({
          name: '',
          email: '',
          password: '',
          role: 'Employee',
          address: '',
          grade: '',
          job_location: '',
          reporting_manager: '',
          joining_date: ''
        });
      } else {
        alert('Failed to add user: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the user.');
    }
  };

  return (
    <div className="add-user-container">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
        <label>
          Role:
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="Employee">Employee</option>
            <option value="HR">HR</option>
          </select>
        </label>
        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </label>
        <label>
          Grade:
          <input type="text" name="grade" value={formData.grade} onChange={handleChange} required />
        </label>
        <label>
          Job Location:
          <input type="text" name="job_location" value={formData.job_location} onChange={handleChange} required />
        </label>
        <label>
          Reporting Manager:
          <input type="text" name="reporting_manager" value={formData.reporting_manager} onChange={handleChange} required />
        </label>
        <label>
          Joining Date:
          <input type="date" name="joining_date" value={formData.joining_date} onChange={handleChange} required />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
