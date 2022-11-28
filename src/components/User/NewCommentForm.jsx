import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SelectField from '../SelectField';
import Textarea from '../Textarea';
import API from '../../api';

const initialData = { userId: '', content: '' };

const NewCommentForm = ({ userId, onSubmit }) => {
  const [users, setUsers] = useState([]);
  const [data, setData] = useState(initialData);

  const isDisabled = data.content === '' || data.userId === '';

  useEffect(() => {
    API.users.fetchAllUsers().then(res => setUsers(res));
  }, [userId]);

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit({ ...data, pageId: userId });

    setData(initialData);
  };

  const handleChange = e => {
    const { name, value } = e.currentTarget;

    setData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <SelectField
        options={users}
        label="Выберите пользователя"
        value={data.userId}
        onChange={handleChange}
        name="userId"
        // error={errors.profession}
      />
      <Textarea
        label="Сообщение"
        value={data.content}
        name="content"
        rows="3"
        onChange={handleChange}
      ></Textarea>
      <button
        type="submit"
        className="btn btn-primary ms-auto d-flex"
        disabled={isDisabled}
      >
        Опубликовать
      </button>
    </form>
  );
};

NewCommentForm.propTypes = {
  userId: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default NewCommentForm;
