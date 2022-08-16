import PropTypes from 'prop-types';
import TableBody from '../TableBody';
import TableHeader from '../TableHeader';

const Table = ({ onSort, selectedSort, columns, data, children }) => {
  return (
    <table className="table">
      {children || (
        <>
          <TableHeader {...{ onSort, selectedSort, columns }} />
          <TableBody {...{ columns, data }} />
        </>
      )}
    </table>
  );
};

Table.propTypes = {
  data: PropTypes.array,
  selectedSort: PropTypes.object,
  onSort: PropTypes.func,
  columns: PropTypes.object,
  children: PropTypes.array,
};

export default Table;
