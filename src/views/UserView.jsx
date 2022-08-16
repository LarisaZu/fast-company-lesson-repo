import { useState, useEffect } from 'react';
import _ from 'lodash';
import GroupList from '../components/GroupList';
import SearchStatus from '../components/SearchStatus';
import UsersTable from '../components/UsersTable';
import CustomLoader from '../components/CustomLoader';
import fetchAllProfessions from '../api/fake.api.new/professions.api';
import fetchAllUsers from '../api/fake.api.new/user.api';

const UserView = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [professions, setProfessions] = useState([]);
  const [selectedProf, setSelectedProf] = useState(null);
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });

  useEffect(() => {
    setIsLoading(true);

    fetchAllProfessions()
      .then(res => setProfessions(res))
      .then(() => setIsLoading(false));
  }, [professions]);

  useEffect(() => {
    setIsLoading(true);

    fetchAllUsers()
      .then(res => setUsers(res))
      .then(() => setIsLoading(false));
  }, []);

  const handleProfessionSelect = items => {
    setSelectedProf(items);
  };

  const filteredUsers = selectedProf
    ? users.filter(user => user.profession.name === selectedProf.name)
    : users;

  const length = filteredUsers.length;

  const sortedUsers = _.orderBy(filteredUsers, sortBy.path, sortBy.order);

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

  const handleSortBy = item => {
    setSortBy(item);
  };

  return (
    <>
      {isLoading ? (
        <CustomLoader />
      ) : (
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
              onSort={handleSortBy}
              selectedProf={selectedProf}
              users={sortedUsers}
              onDeleteItem={handleDeleteUser}
              selectedSort={sortBy}
              onToggleBookMark={handleToggleBookMark}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default UserView;
