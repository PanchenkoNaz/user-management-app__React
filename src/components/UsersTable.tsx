import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, setFilter } from '../features/usersSlice';
import { RootState, AppDispatch } from '../store';

const UsersTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, filters } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    dispatch(setFilter({ field, value: e.target.value }));
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(filters.name.toLowerCase()) &&
    user.username.toLowerCase().includes(filters.username.toLowerCase()) &&
    user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
    user.phone.toLowerCase().includes(filters.phone.toLowerCase())
  );

  return (
    <div>
      <h1>User Management</h1>
      <div>
        <input
          type="text"
          placeholder="Filter by Name"
          value={filters.name}
          onChange={(e) => handleFilterChange(e, 'name')}
        />
        <input
          type="text"
          placeholder="Filter by Username"
          value={filters.username}
          onChange={(e) => handleFilterChange(e, 'username')}
        />
        <input
          type="text"
          placeholder="Filter by Email"
          value={filters.email}
          onChange={(e) => handleFilterChange(e, 'email')}
        />
        <input
          type="text"
          placeholder="Filter by Phone"
          value={filters.phone}
          onChange={(e) => handleFilterChange(e, 'phone')}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
