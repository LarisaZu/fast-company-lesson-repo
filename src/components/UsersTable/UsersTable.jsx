import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Pagination from '../Pagination';
import BookMark from '../BookMark';
import QualitiesList from '../QualitiesList';
import Profession from '../Profession';
import Table from '../Table';
import paginate from '../../utils/paginate';

const UsersTable = ({
  users,
  selectedProf,
  selectedSort,
  onToggleBookMark,
  onSort,
  onDeleteItem,
  search,
  ...rest
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const length = users.length;
  const pageSize = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf, search]);

  const columns = {
    name: {
      title: 'Имя',
      content: user => {
        return <>{user.name || 'Anonymous'}</>;
      },
    },
    qualities: {
      title: 'Качества',
      content: user => {
        return <QualitiesList qualities={user.qualities} />;
      },
    },
    professions: {
      title: 'Профессия',
      content: user => {
        return <Profession id={user.profession} />;
      },
    },
    completedMeetings: { path: 'completedMeetings', title: 'Встретился, раз' },
    rate: { path: 'rate', title: 'Оценка' },
    bookmark: {
      path: 'bookmark',
      title: 'Избранное',
      content: user => (
        <BookMark
          status={user.bookmark}
          onClick={() => onToggleBookMark(user._id)}
        />
      ),
    },
    delete: {
      content: user => (
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onDeleteItem(user._id)}
        >
          Delete
        </button>
      ),
    },
  };

  const handlePageChange = pageNum => {
    setCurrentPage(pageNum);
  };

  const usersCrop = paginate(users, pageSize, currentPage);

  return (
    <>
      {users.length > 0 && (
        <Table
          onSort={onSort}
          selectedSort={selectedSort}
          columns={columns}
          data={usersCrop}
        />
      )}
      <Pagination
        itemsCount={length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  search: PropTypes.string,
  selectedProf: PropTypes.object,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onToggleBookMark: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
};

export default UsersTable;
