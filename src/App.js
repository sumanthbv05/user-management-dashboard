import React, { useState } from 'react';
import UserDetails from './components/UserDetails';
import AccountCreation from './components/AccountCreation';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for accessibility

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('userDetails');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="heading">User Management Dashboard</h1>

      <div className="flex mb-4">
        <button
          className={`mr-4 px-4 py-2 ${activeTab === 'userDetails' ? 'button-filled' : 'button-outline'}`}
          onClick={() => switchTab('userDetails')}
        >
           User Details 
        </button>

        <button
          className={`px-4 py-2 ${activeTab === 'accountCreation' ? 'button-filled' : 'button-outline'}`}
          onClick={() => switchTab('accountCreation')}
        >
           Account Creation 
        </button>
      </div>

      <div>
        {activeTab === 'userDetails' && <UserDetails openModal={openModal} />}
        {activeTab === 'accountCreation' && <AccountCreation />}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="react-modal-content"
        overlayClassName="react-modal-overlay"
        contentLabel="Generate Report Modal"
      >
        <h2 className="text-2xl font-bold mb-4">Generate Report</h2>
        {selectedUser && (
          <div>
            <p className="mb-4">Generate a report for user: {selectedUser.username}</p>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:border focus:border-blue-500 mr-2"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded focus:outline-none focus:border focus:border-green-500"
              onClick={() => {
                closeModal();
              }}
            >
              Generate Report
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Dashboard;
