import { Link, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

const TableBody = ({ data, columns }) => {
  const { url } = useRouteMatch();

  const renderContent = (item, column) => {
    if (columns[column].content) {
      const component = columns[column].content;

      if (typeof component === 'function') {
        return component(item);
      }
      return component;
    }
    return _.get(item, columns[column].path);
  };

  return (
    <tbody>
      {data.map(item => (
        <tr key={item._id}>
          {Object.keys(columns).map(column => {
            return (
              <td key={column}>
                {column === 'name' ? (
                  <Link to={`${url}/${item._id}`}>
                    {renderContent(item, column)}
                  </Link>
                ) : (
                  renderContent(item, column)
                )}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired,
};

export default TableBody;
