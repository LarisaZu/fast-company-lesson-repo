import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';
import QualitiesList from '../QualitiesList';

const User = ({ currentUser }) => {
  const { url } = useRouteMatch();

  return (
    <>
      <h2>{currentUser.name}</h2>
      <h3>Профессия: {currentUser.profession.name}</h3>
      <QualitiesList qualities={currentUser.qualities} />
      <p>CompletedMeetings: {currentUser.completedMeetings}</p>
      <h3>Rate: {currentUser.rate}</h3>

      <Link to={`${url}/edit`}>
        <button type="button" className="btn btn-outline-primary">
          Редактировать <i className="bi bi-pen-fill"></i>
        </button>
      </Link>
    </>
  );
};

User.propTypes = {
  currentUser: PropTypes.object.isRequired,
};

export default User;
