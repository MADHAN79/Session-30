import { useState } from 'react';
import api from '../api/api';

const UserForm = ({ onUserAdded }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/', { name, email })
      .then((response) => {
        onUserAdded(response.data);
        setName('');
        setEmail('');
      })
      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className='formTitle'>Add User</h2>
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
      <button className="formButton"  type="submit">Add User</button>
    </form>
  );
};

export default UserForm;
