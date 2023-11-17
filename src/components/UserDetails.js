import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for accessibility

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch user data from a placeholder API (e.g., JSONPlaceholder)
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        // Assuming each user object has a property named 'createdAt'
        const usersWithCreatedAt = data.map((user) => ({
          ...user,
          createdAt: new Date().toLocaleDateString(), // Placeholder for creation date
        }));
        setUsers(usersWithCreatedAt);
      });
  }, []);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const handleGenerateReport = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by username"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>ID</th>
            <th>Creation Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.id}</td>
              <td>{user.createdAt}</td>
              <td>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:border focus:border-blue-500 mr-2"
                  onClick={() => handleGenerateReport(user)}
                >
                  Generate Report
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for generating a report */}
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
                // You can call your generate report function here
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

export default UserDetails;
