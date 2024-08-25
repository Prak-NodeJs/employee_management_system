import React, { useState, useEffect, useContext } from 'react';
import { storeContext } from '../../context/context';
import './Profile.css';

const Profile = () => {
  const { authData } = useContext(storeContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user`, {
          headers: {
            'Authorization': `Bearer ${authData.token}`
          }
        });

        const result = await response.json();

        if (result.success) {
          setUserData(result.data);
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [authData.token]);

  return (
    <div className="profile-container">
       <h2>Profile</h2>
      {userData ? (
        <div className="profile-details">
        <div className="personal_details">
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Role:</strong> {userData.role}</p>
          <p><strong>Address:</strong> {userData.address}</p>
          <p><strong>Grade:</strong> {userData.grade}</p>
          <p><strong>Job Location:</strong> {userData.job_location}</p>
          <p><strong>Reporting Manager:</strong> {userData.reporting_manager}</p>
          <p><strong>Joining Date:</strong> {new Date(userData.joining_date).toLocaleDateString()}</p>
          </div>
          <div className="leave_details">
          <p><strong>Total Leave : </strong> {userData.totalLeave}</p>
          <p><strong>Leaves Taken : </strong> {userData.totalLeaveTaken}</p>
          <p><strong>Balance Leave : </strong> {userData.totalBalanceLeaves}</p>
          <p><strong>Total Casual Leave : </strong>{userData.totalCasualLeave}</p>
          <p><strong>Balance Casual Leave : </strong>{userData.balanceCasualLeaves}</p>
          <p><strong>Casual Leave Taken : </strong>{userData.totalCasualLeaveTaken}</p>
          <p><strong>Total Sick Leave : </strong>{userData.totalSickLeave}</p>
          <p><strong>Balance Sick Leave : </strong>{userData.balanceSickLeaves}</p>
          <p><strong>Sick Leave Taken : </strong>{userData.totalSickLeaveTaken}</p>
          </div>
        </div>
      ) : (
        <p>Loading profile data...</p>
      )}
    </div>
  );
};

export default Profile;
