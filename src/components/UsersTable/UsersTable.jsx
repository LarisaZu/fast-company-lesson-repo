import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import User from '../User';
import Pagination from '../Pagination';
import paginate from '../../utils/paginate';

const UsersTable = ({ users, selectedProf, ...rest }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const length = users.length;
  const pageSize = 4;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handlePageChange = pageNum => {
    setCurrentPage(pageNum);
  };

  const usersCrop = paginate(users, pageSize, currentPage);

  return (
    <>
      {users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {usersCrop.map(user => (
              <User key={user._id} item={user} {...rest} />
            ))}
          </tbody>
        </table>
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
  selectedProf: PropTypes.object,
};

export default UsersTable;
