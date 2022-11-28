import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { orderBy } from 'lodash';
import Card from '../Card';
import Divider from '../Divider';
import CommentsList from './CommentsList';
import { NewCommentForm } from './';
import API from '../../api';

const CommentCard = () => {
  const [comments, setComments] = useState([]);

  const { userId } = useParams();

  useEffect(() => {
    API.comments.fetchCommentsByUserId(userId).then(res => setComments(res));
  }, [userId]);

  const handleRemoveCommentById = commentId => {
    API.comments
      .removeById(commentId)
      .then(id => setComments(prev => prev.filter(el => el._id !== id)));
  };

  const onSubmitComment = data => {
    API.comments.add(data).then(res => setComments(prev => [...prev, res]));
  };

  const sortedComments = orderBy(comments, ['created_at'], ['desc']);

  return (
    <>
      <Card styles="mb-3">
        <h2>New comment</h2>
        <NewCommentForm userId={userId} onSubmit={onSubmitComment} />
      </Card>
      {comments.length > 0 && (
        <Card>
          <h2>Comments</h2>
          <Divider />
          <CommentsList
            comments={sortedComments}
            onRemove={handleRemoveCommentById}
          />
        </Card>
      )}
    </>
  );
};

export default CommentCard;
