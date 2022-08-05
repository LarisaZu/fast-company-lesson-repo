import { useState, useEffect } from 'react';
import GroupList from '../components/GroupList';
import SearchStatus from '../components/SearchStatus';
import UsersTable from '../components/UsersTable';
// import api from '../api';
import fetchAllProfessions from '../api/fake.api.new/professions.api';
import fetchAllUsers from '../api/fake.api.new/user.api';

const UserView = () => {
  const [users, setUsers] = useState([]);
  const [professions, setProfessions] = useState([]);
  const [selectedProf, setSelectedProf] = useState(null);

  useEffect(() => {
    fetchAllProfessions().then(res => setProfessions(res));
  }, [professions]);

  useEffect(() => {
    fetchAllUsers().then(res => setUsers(res));
  }, []);

  const handleProfessionSelect = items => {
    setSelectedProf(items);
  };

  const filteredUsers = selectedProf
    ? users.filter(user => user.profession.name === selectedProf.name)
    : users;

  const length = filteredUsers.length;

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
  };

  const handleClearFilter = () => {
    setSelectedProf();
  };

  return (
    <div className="d-flex p-3 justify-content-around p-3">
      {professions && (
        <GroupList
          items={professions}
          onSelectItem={handleProfessionSelect}
          selectedItem={selectedProf}
          onClearFilter={handleClearFilter}
        />
      )}
      <div className="d-flex flex-column ms-4 align-items-center">
        <SearchStatus num={length} />
        <UsersTable
          selectedProf={selectedProf}
          users={filteredUsers}
          onDeleteItem={handleDeleteUser}
          onToggleBookMark={handleToggleBookMark}
        />
      </div>
    </div>
  );
};

export default UserView;
