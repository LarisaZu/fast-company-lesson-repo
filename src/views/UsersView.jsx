import { useState } from 'react';
import _ from 'lodash';
import GroupList from '../components/GroupList';
import SearchStatus from '../components/SearchStatus';
import UsersTable from '../components/UsersTable';
import CustomLoader from '../components/CustomLoader';
import TextInput from '../components/TextInput';
import { useUsers } from '../hooks/useUsers';
import { useProfessions } from '../hooks/useProfession';

const UsersView = () => {
  const [selectedProf, setSelectedProf] = useState(null);
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
  const [search, setSearch] = useState('');

  const { users, isLoading } = useUsers();
  const { professions } = useProfessions();

  const handleProfessionSelect = items => {
    if (search) {
      handleClearFilterBySearch();
    }
    setSelectedProf(items);
  };

  const filteredUsers = search
    ? users.filter(user =>
        user?.name?.toLowerCase().includes(search.toLowerCase()),
      )
    : selectedProf
    ? users.filter(user => user.profession === selectedProf._id)
    : users;

  const length = filteredUsers.length;

  const sortedUsers = _.orderBy(filteredUsers, sortBy.path, sortBy.order);

  const handleDeleteUser = id => {
    console.log('🚀 ~ file: UsersView.jsx:70 ~ handleDeleteUser ~ id', id);
    // setUsers(users.filter(user => user._id !== id));
  };
  const handleToggleBookMark = id => {
    console.log('🚀 ~ file: UsersView.jsx:74 ~ handleToggleBookMark ~ id', id);
    // setUsers(
    //   users.map(user => {
    //     if (user._id === id) {
    //       return { ...user, bookmark: !user.bookmark };
    //     }
    //     return user;
    //   }),
    // );
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
    console.log(
      '🚀 ~ file: UsersView.jsx:68 ~ handleInputSearchChange ~ value',
      value,
    );
    // if (selectedProf) {
    //   handleClearFilterByProf();
    // }
    setSearch(value);
  };

  return (
    <>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <div className="d-flex">
          <GroupList
            items={professions}
            onSelectItem={handleProfessionSelect}
            selectedItem={selectedProf}
            onClearFilter={handleClearFilterByProf}
          />

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
              search={search}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default UsersView;
