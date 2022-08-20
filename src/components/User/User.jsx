import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import QualitiesList from '../QualitiesList';

const User = ({ currentUser }) => {
  const history = useHistory();

  const handleBtnClick = () => {
    history.push('/users');
  };

  return (
    <>
      <h2>{currentUser.name}</h2>
      <h3>Профессия: {currentUser.profession.name}</h3>
      <QualitiesList qualities={currentUser.qualities} />
      <p>CompletedMeetings: {currentUser.completedMeetings}</p>
      <h3>Rate: {currentUser.rate}</h3>
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={handleBtnClick}
      >
        Все пользователи
      </button>
    </>
  );
};

User.propTypes = {
  currentUser: PropTypes.object.isRequired,
};

export default User;
