import { useState, useEffect } from 'react';
import TextInput from '../TextInput';
import SelectField from '../SelectField';
import CustomSelect from '../CustomSelect';
import RadioInput from '../RadioInput';
import CheckboxField from '../CheckboxField';
import { validator } from '../../utils/validator';
import API from '../../api';

const initialData = {
  email: '',
  password: '',
  profession: '',
  sex: 'male',
  qualities: [],
  licence: false,
};

const SignupForm = () => {
  const [data, setData] = useState(initialData);
  const [professions, setProfessions] = useState([]);
  const [qualities, setQualities] = useState([]);
  const [errors, setErrors] = useState({});

  const validatorConfig = {
    email: {
      isRequired: { message: 'Электронная почта обязательна для заполнения' },
      isEmail: { message: 'Некорректный email' },
    },
    password: {
      isRequired: { message: 'Пароль обязателен для заполнения' },
      isCapitalSymbol: {
        message: 'Пароль должен содержать хотя бы одну заглавную букву',
      },
      isContainDigit: {
        message: 'Пароль должен содержать хотя бы одну цифру',
      },
      minLength: {
        message: 'Пароль должен состоять минимум из 8 символов',
        value: 8,
      },
    },
    profession: {
      isRequired: { message: 'Профессия обязательна' },
    },
    qualities: {
      isRequired: { message: 'Качества обязательны' },
    },
    licence: {
      isRequired: {
        message:
          'Вы не можете использовать наш сервис без подтверждения лицензионного соглашения',
      },
    },
  };

  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    validate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    let isCleanup = false;

    Promise.all([API.fetchAllProfessions(), API.users.fetchQualities()]).then(
      res => {
        if (!isCleanup) {
          setProfessions(res[0]);
          setQualities(Object.values(res[1]));
        }
      },
    );
    return () => {
      isCleanup = true;
    };
  }, []);

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

  const handleFormSubmit = e => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) return;
    formReset();
  };

  const formReset = () => {
    setData(initialData);
  };

  const handleChange = e => {
    const { name, value } = e.currentTarget;

    setData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelect = (selected, { name }) => {
    setData(prevState => ({
      ...prevState,
      [name]: selected,
    }));
  };

  const handleCheckbox = e => {
    const { name, checked } = e.currentTarget;

    setData(prevState => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <form onSubmit={handleFormSubmit} autoComplete="off">
      <TextInput
        label="Почта"
        value={data.email}
        name="email"
        autoFocus
        error={errors.email}
        onChange={handleChange}
      />
      <TextInput
        label="Пароль"
        value={data.password}
        name="password"
        type="password"
        error={errors.password}
        onChange={handleChange}
      />
      <SelectField
        options={professions}
        label="Выберите свою профессию"
        value={data.profession}
        onChange={handleChange}
        name="profession"
        error={errors.profession}
      />
      <RadioInput
        options={[
          { name: 'M', value: 'male' },
          { name: 'Ж', value: 'female' },
        ]}
        value={data.sex}
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
        onChange={handleSelect}
        styles={colorStyles}
        label="Выберите качества"
        error={errors.qualities}
        value={data.qualities}
      />
      <CheckboxField
        name="licence"
        checked={data.licence}
        onChange={handleCheckbox}
        error={errors.licence}
      >
        Подтвердить <a href="/">Лицензионное соглашение</a>
      </CheckboxField>

      <button
        className="btn btn-primary w-100 mx-auto"
        type="submit"
        disabled={!isValid}
      >
        Отправить
      </button>
    </form>
  );
};

export default SignupForm;
