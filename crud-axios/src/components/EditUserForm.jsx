import React, { useState, useEffect } from 'react';
import api from '../api/api';

const EditUserForm = ({ user, onUserUpdated }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if the user is from the API or newly added
    if (user.id <= 10) {
      // Existing API user
      api.put(`/${user.id}`, { name, email })
        .then((response) => {
          onUserUpdated(response.data);
        })
        .catch((error) => console.error(error));
    } else {
      // Newly added user, update locally
      onUserUpdated({ ...user, name, email });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit User</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <button type="submit">Update User</button>
    </form>
  );
};

export default EditUserForm;
