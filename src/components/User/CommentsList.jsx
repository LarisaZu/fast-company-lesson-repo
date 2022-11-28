import PropTypes from 'prop-types';
import { Comment } from './';

const CommentsList = ({ comments, onRemove }) => {
  return (
    <ul className="list-unstyled">
      {comments.map(comment => {
        return (
          <li key={comment._id} className="shadow-sm">
            <Comment comment={comment} onRemove={onRemove} />
          </li>
        );
      })}
    </ul>
  );
};

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default CommentsList;
