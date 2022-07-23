import PropTypes from 'prop-types';
import Qualitie from '../Qualitie';
import BookMark from '../BookMark';

const User = ({ item, onDeleteItem, onToggleBookMark }) => {
  const {
    name,
    qualities,
    profession,
    bookmark,
    completedMeetings,
    rate,
    _id,
  } = item;
  return (
    <tr>
      <td>{name}</td>
      <td>
        {qualities.map(el => (
          <Qualitie key={el._id} color={el.color} name={el.name} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}</td>
      <td>
        {' '}
        <BookMark status={bookmark} onClick={() => onToggleBookMark(_id)} />
      </td>
      <td>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onDeleteItem(_id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

User.propTypes = {
  item: PropTypes.object.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onToggleBookMark: PropTypes.func.isRequired,
};

export default User;
