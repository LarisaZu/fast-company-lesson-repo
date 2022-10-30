import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import TextInput from '../TextInput';
import RadioInput from '../RadioInput';
import CustomSelect from '../CustomSelect';
import SelectField from '../SelectField';

const UserEditForm = ({ currentUser, professions, qualities, onSubmit }) => {
  const [user, setUser] = useState({
    bookmark: false,
    completedMeetings: '',
    name: '',
    profession: {},
    qualities: [],
    rate: '',
    sex: 'male',
    email: '',
  });
  const [errors, setErrors] = useState({});

  const isValid = Object.keys(errors).length === 0;

  const validateSchema = yup.object().shape({
    email: yup
      .string()
      .required('Электронная почта обязательна для заполнения')
      .email('Некорректный email'),
    name: yup.string().required('Имя обязательно'),
    qualities: yup.array().of(yup.object()).min(1, 'Качества обязательны'),
  });

  useEffect(() => {
    if (currentUser) {
      setUser(prev => ({
        ...currentUser,
      }));
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      validate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, currentUser]);

  const validate = () => {
    validateSchema
      .validate(user)
      .then(() => setErrors({}))
      .catch(err => setErrors({ [err.path]: err.message }));
    return Object.keys(errors).length === 0;
  };

  const submitUserHandler = e => {
    e.preventDefault();

    onSubmit(user);
  };

  const handleChange = e => {
    const { name, value } = e.currentTarget;

    setUser(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelect = e => {
    const { value, name, selectedOptions } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: { _id: value, name: selectedOptions[0].label },
    }));
  };

  const handleCustomSelect = (selected, { name }) => {
    setUser(prevState => ({
      ...prevState,
      [name]: selected,
    }));
  };

  const colorStyles = {
    multiValueLabel: styles => ({
      ...styles,
      color: 'white',
    }),
    multiValueRemove: styles => ({
      ...styles,
      color: 'initial',
    }),
  };

  return (
    <form onSubmit={submitUserHandler} autoComplete="off">
      <TextInput
        label="Имя"
        value={user.name}
        name="name"
        error={errors.name}
        onChange={handleChange}
      />
      <TextInput
        label="Электронная почта"
        value={user.email}
        name="email"
        error={errors.email}
        onChange={handleChange}
      />
      <SelectField
        options={professions}
        label="Выберите профессию"
        value={user.profession._id}
        name="profession"
        onChange={handleSelect}
        error={errors.profession}
      />
      <RadioInput
        options={[
          { name: 'M', value: 'male' },
          { name: 'Ж', value: 'female' },
        ]}
        value={user.sex}
        onChange={handleChange}
        name="sex"
        label="Укажите ваш пол"
      />
      <CustomSelect
        isMulti
        name="qualities"
        placeholder="Выберите вариант..."
        options={qualities}
        getOptionValue={option => option._id}
        getOptionLabel={option => option.name}
        onChange={handleCustomSelect}
        styles={colorStyles}
        label="Выберите качества"
        error={errors.qualities}
        value={user.qualities}
      />
      <button
        className="btn btn-primary w-100 mx-auto"
        type="submit"
        disabled={!isValid}
      >
        Обновить
      </button>
    </form>
  );
};

UserEditForm.propTypes = {
  currentUser: PropTypes.object,
  professions: PropTypes.arrayOf(PropTypes.object).isRequired,
  qualities: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default UserEditForm;
