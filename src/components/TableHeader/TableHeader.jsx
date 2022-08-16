import PropTypes from 'prop-types';
import Caret from '../Caret';

const TableHeader = ({ onSort, selectedSort, columns }) => {
  const handleSort = item => {
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === 'asc' ? 'desc' : 'asc',
      });
    } else {
      onSort({ path: item, order: 'asc' });
    }
  };

  const renderCaret = (selectedSort, column) => {
    if (selectedSort.path === columns[column].path) {
      return selectedSort.order === 'asc' ? (
        <Caret type="asc" />
      ) : (
        <Caret type="desc" />
      );
    }
  };
  return (
    <thead>
      <tr>
        {Object.keys(columns).map(column => {
          return (
            <th
              key={column}
              onClick={
                columns[column].path && (() => handleSort(columns[column].path))
              }
              {...{ role: columns[column].path && 'button' }}
              scope="col"
            >
              {columns[column].title} {renderCaret(selectedSort, column)}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired,
};

export default TableHeader;
