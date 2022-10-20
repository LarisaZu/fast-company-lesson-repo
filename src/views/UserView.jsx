import { useState, useEffect } from 'react';
import _ from 'lodash';
import GroupList from '../components/GroupList';
import SearchStatus from '../components/SearchStatus';
import UsersTable from '../components/UsersTable';
import CustomLoader from '../components/CustomLoader';
import TextInput from '../components/TextInput';
import fetchAllProfessions from '../api/fake.api.new/professions.api';
import { fetchAllUsers } from '../api/fake.api.new/user.api';

const UserView = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [professions, setProfessions] = useState([]);
  const [selectedProf, setSelectedProf] = useState(null);
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
  const [search, setSearch] = useState('');

  useEffect(() => {
    let isCleanup = false;
    setIsLoading(true);

    fetchAllProfessions().then(res => {
      if (!isCleanup) {
        setProfessions(res);
        setIsLoading(false);
      }
    });
    return () => {
      isCleanup = true;
    };
  }, [professions]);

  useEffect(() => {
    let isCleanup = false;
    setIsLoading(true);

    fetchAllUsers().then(res => {
      if (!isCleanup) {
        setUsers(res);
        setIsLoading(false);
      }
    });
    return () => {
      isCleanup = true;
    };
  }, []);

  const handleProfessionSelect = items => {
    if (search) {
      handleClearFilterBySearch();
    }
    setSelectedProf(items);
  };

  const filteredUsers = selectedProf
    ? users.filter(user => user.profession.name === selectedProf.name)
    : search
    ? users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()),
      )
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

  const handleClearFilterByProf = () => {
    setSelectedProf(null);
  };

  const handleClearFilterBySearch = () => {
    setSearch('');
  };

  const handleSortBy = item => {
    setSortBy(item);
  };

  const handleInputSearchChange = e => {
    const { value } = e.currentTarget;
    if (selectedProf) {
      handleClearFilterByProf();
    }
    setSearch(value);
  };

  return (
    <>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <div className="d-flex p-3">
          {professions && (
            <GroupList
              items={professions}
              onSelectItem={handleProfessionSelect}
              selectedItem={selectedProf}
              onClearFilter={handleClearFilterByProf}
            />
          )}
          <div className="d-flex flex-column ms-4 align-items-start">
            <SearchStatus num={length} />
            <TextInput
              name="search"
              value={search}
              placeholder="Search..."
              className="form-control mb-3 mt-3"
              onChange={handleInputSearchChange}
            />
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
