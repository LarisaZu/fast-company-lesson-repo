import { useState } from 'react';
import api from './api';
import SearchStatus from './components/SearchStatus';
import UsersTable from './components/UsersTable';

function App() {
  const [users, setUsers] = useState(() => api.users.fetchAll());
  const length = users.length;

  const handleDeleteUser = id => {
    setUsers(users.filter(user => user._id !== id));
  };
  const handleToggleBookMark = id => {
    setUsers(
      users.map(user => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark };
        }
        return user;
      }),
    );
    console.log(id);
  };
  return (
    <>
      <SearchStatus num={length} />
      <UsersTable
        users={users}
        onDeleteItem={handleDeleteUser}
        onToggleBookMark={handleToggleBookMark}
      />
    </>
  );
}

export default App;
