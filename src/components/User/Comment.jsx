import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import getRandomStr from '../../utils/getRandomStr';
import displayDate from '../../utils/displayDate';
import API from '../../api';
import { useUsers } from '../../hooks/useUsers';

const Comment = ({ comment, onRemove }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { identifyUserById } = useUsers();

  const { created_at, _id, content, userId } = comment;
  const randomUrl = getRandomStr();

  useEffect(() => {
    setIsLoading(true);

    const author = identifyUserById(userId);
    console.log('🚀 ~ file: Comment.jsx:20 ~ useEffect ~ author', author);
    setUser(author);
    setIsLoading(false);
    // API.users.getUserById(userId).then(res => {
    //   setUser(res);
    //   setIsLoading(false);
    // });
  }, [identifyUserById, userId]);

  return (
    <div className="bg-success bg-opacity-10 card-body mb-3">
      <div className="row">
        {isLoading ? (
          'Loading...'
        ) : (
          <div className="col">
            <div className="d-flex flex-start">
              <img
                src={`https://avatars.dicebear.com/api/avataaars/${randomUrl}.svg`}
                className="rounded-circle shadow bg-light me-3"
                alt="avatar"
                width="65"
                height="65"
              />
              <div className="flex-grow-1 flex-shrink-1">
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-1 ">
                      {user?.name}
                      <span className="small">
                        {' '}
                        - {displayDate(created_at)}
                      </span>
                    </p>
                    <button
                      className="btn btn-sm text-primary d-flex align-items-center"
                      onClick={() => onRemove(_id)}
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  </div>
                  <p className="small mb-0">{content}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Comment;
