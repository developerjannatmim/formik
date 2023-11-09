import React from 'react';
import Navbar from './Navbar';

const Dashboard = () => {
  const authName = localStorage.getItem('auth_name');
  return (
    <div>
      <Navbar />
      <div>
        <h5 className="authName mt-5 text-center">
          Welcome to Home Page <b>{authName}</b>
        </h5>
      </div>
    </div>
  );
};

export default Dashboard;
