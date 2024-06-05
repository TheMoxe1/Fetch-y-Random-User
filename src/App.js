import React, { useState, useEffect } from "react";
import "./Fetch.css"; 

const UserCard = ({ user, onClick }) => {
  return (
    <div className="user-card" onClick={() => onClick(user)}>
      <img className="user-avatar" src={user.picture.medium} alt={user.name.first} />
      <div className="user-details">
        <h3>{user.name.first} {user.name.last}</h3>
        <p><strong>País:</strong> {user.location.country}</p>
      </div>
    </div>
  );
};

const UserModal = ({ user, onClose }) => {
  return (
    <div className="user-modal">
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <img className="user-avatar" src={user.picture.large} alt={user.name.first} />
        <h2>{user.name.first} {user.name.last}</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Edad:</strong> {user.dob.age}</p>
        <p><strong>Ubicación:</strong> {`${user.location.city}, ${user.location.country}`}</p>
        <p><strong>Fecha de Cumpleaños:</strong> {new Date(user.dob.date).toLocaleDateString()}</p>
      </div>
    </div>
  );
};


// Fetch 
const UsersList = () => {
  const urlApi = "https://randomuser.me/api/?results=5";
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch(urlApi)
      .then((response) => response.json())
      .then((data) => setUsers(data.results))
      .catch((error) => console.log("Hubo un error " + error));
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className="user-list-container">
      <h1 className="list-title">Listado:</h1>
      <div className="user-cards">
        {users.map((user, index) => (
          <UserCard key={index} user={user} onClick={handleUserClick} />
        ))}
      </div>
      {selectedUser && (
        <UserModal user={selectedUser} onClose={handleCloseModal} />
      )}
    </div>
  );  
};

export default UsersList;
