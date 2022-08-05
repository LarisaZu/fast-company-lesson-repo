import PropTypes from 'prop-types';

const GroupList = ({
  items,
  value = '_id',
  content = 'name',
  onSelectItem,
  selectedItem,
  onClearFilter,
}) => {
  return (
    <div>
      <ul className="list-group">
        {items.map(item => (
          <li
            key={item[value]}
            className={
              'list-group-item' + (selectedItem === item ? ' active' : '')
            }
            aria-current="true"
            role="button"
            onClick={() => onSelectItem(item)}
          >
            {item[content]}
          </li>
        ))}
      </ul>
      {selectedItem && (
        <button className="btn btn-warning mt-2" onClick={onClearFilter}>
          Сбросить
        </button>
      )}
    </div>
  );
};

GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onSelectItem: PropTypes.func,
  value: PropTypes.string,
  content: PropTypes.string,
  selectedItem: PropTypes.object,
  onClearFilter: PropTypes.func,
};

export default GroupList;
