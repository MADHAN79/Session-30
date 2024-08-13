import React, { useState, useEffect } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import EditUserForm from './components/EditUserForm';
import api from './api/api';

const App = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    api.get('/')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleUserAdded = (newUser) => {
    // Assign a unique ID that won't conflict with existing API users
    const nextId = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1;
    const userWithId = { ...newUser, id: nextId };
    setUsers([...users, userWithId]);
  };

  const handleUserUpdated = (updatedUser) => {
    setUsers(users.map((user) => 
      user.id === updatedUser.id ? updatedUser : user
    ));
    setEditingUser(null);
  };

  const handleUserDeleted = (id) => {
    api.delete(`/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>User Management</h1>
      <UserForm onUserAdded={handleUserAdded} />
      {editingUser && (
        <EditUserForm user={editingUser} onUserUpdated={handleUserUpdated} />
      )}
      <UserList
        users={users}
        onEdit={setEditingUser}
        onDelete={handleUserDeleted}
      />
    </div>
  );
};

export default App;
