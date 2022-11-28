import { Link, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from '../Card';
import getRandomStr from '../../utils/getRandomStr';
// import defaultAvatar from '../../assets/avatar.png';

const AvatarCard = ({ user }) => {
  const { url } = useRouteMatch();

  const randomUrl = getRandomStr();
  return (
    <Card styles="mb-3">
      <Link to={`${url}/edit`}>
        <button className="position-absolute top-0 end-0 btn btn-light btn-sm">
          <i className="bi bi-gear"></i>
        </button>
      </Link>
      <div className="d-flex flex-column align-items-center text-center position-relative">
        <img
          src={`https://avatars.dicebear.com/api/avataaars/${randomUrl}.svg`}
          className="rounded-circle shadow"
          width="150"
          alt={user.name}
        />
        <div className="mt-3">
          <h4>{user.name}</h4>
          <p className="text-secondary mb-1">{user.profession.name}</p>

          <div className="text-muted">
            <i
              className="bi bi-hand-thumbs-up-fill text-primary me-1"
              role="button"
            ></i>
            <i
              className="bi bi-hand-thumbs-down-fill text-danger"
              role="button"
            ></i>
            <span className="ms-2">{user.rate}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

AvatarCard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default AvatarCard;
