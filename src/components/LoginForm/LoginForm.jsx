import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import CustomLoader from '../CustomLoader';
import TextInput from '../TextInput/TextInput';
import CheckboxField from '../CheckboxField';
import { useAuth } from '../../hooks/useAuth';
// import { validator } from '../../utils/validator';

const initialData = { email: '', password: '', stayOn: false };

const LoginForm = () => {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const history = useHistory();

  const { login, isLoading } = useAuth();

  const validateSchema = yup.object().shape({
    password: yup
      .string()
      .required('Пароль обязателен для заполнения')
      .matches(
        /(?=.*[A-Z])/,
        'Пароль должен содержать хотя бы одну заглавную букву',
      )
      .matches(/(?=.*[0-9])/, 'Пароль должен содержать хотя бы одну цифру')
      .matches(
        /(?=.*[!@#$%^&*])/,
        'Пароль должен содержать хотя бы один специальный символ',
      )
      .min(8, 'Пароль должен состоять минимум из 8 символов'),
    // .matches(/(?=.{8,})/, 'Пароль должен состоять минимум из 8 символов'),
    email: yup
      .string()
      .required('Электронная почта обязательна для заполнения')
      .email('Некорректный email'),
  });

  // const validatorConfig = {
  //   email: {
  //     isRequired: { message: 'Электронная почта обязательна для заполнения' },
  //     isEmail: { message: 'Некорректный email' },
  //   },
  //   password: {
  //     isRequired: { message: 'Пароль обязателен для заполнения' },
  //     isCapitalSymbol: {
  //       message: 'Пароль должен содержать хотя бы одну заглавную букву',
  //     },
  //     isContainDigit: {
  //       message: 'Пароль должен содержать хотя бы одну цифру',
  //     },
  //     minLength: {
  //       message: 'Пароль должен состоять минимум из 8 символов',
  //       value: 8,
  //     },
  //   },
  // };

  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    validate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleFormSubmit = async e => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) return;

    try {
      await login(data);
      history.push('/');
    } catch (error) {
      setErrors(error);
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.currentTarget;

    setData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckbox = e => {
    const { name, checked } = e.currentTarget;

    setData(prevState => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form, e.target);
      form.elements[index + 1].focus();
    }
  };

  const validate = () => {
    // const errors = validator(data, validatorConfig);
    validateSchema
      .validate(data)
      .then(() => setErrors({}))
      .catch(err => setErrors({ [err.path]: err.message }));
    // setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <>
      {isLoading && <CustomLoader />}
      <form onSubmit={handleFormSubmit}>
        <TextInput
          label="Почта"
          name="email"
          autoFocus
          value={data.email}
          error={errors.email}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <TextInput
          label="Пароль"
          value={data.password}
          name="password"
          type="password"
          error={errors.password}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <CheckboxField
          name="stayOn"
          checked={data.stayOn}
          onChange={handleCheckbox}
        >
          Оставаться в системе
        </CheckboxField>
        <button
          className="btn btn-primary w-100 mx-auto"
          type="submit"
          disabled={!isValid}
        >
          Отправить
        </button>
      </form>
    </>
  );
};

export default LoginForm;
