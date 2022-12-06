import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { toast } from 'react-toastify';
import authApi from '../services/auth-api';
import userApi from '../services/user-api';
import { setTokens } from '../services/localStorage-api';

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const signUp = async ({ email, password, ...rest }) => {
    try {
      setIsLoading(true);
      const { data } = await authApi.signup({
        email,
        password,
        returnSecureToken: true,
      });
      setTokens(data);
      await createUser({
        _id: data.localId,
        name: 'Anonymous',
        email,
        ...rest,
      });
    } catch (error) {
      errorCatcher(error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async ({ email, password, ...rest }) => {
    try {
      setIsLoading(true);
      const { data } = await authApi.login({
        email,
        password,
        returnSecureToken: true,
      });

      setTokens(data);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createUser = async data => {
    try {
      const res = await userApi.create(data);

      setCurrentUser(res);
    } catch (error) {}
  };

  const errorCatcher = error => {
    const { code, message } = error.response.data.error;
    if (code === 400) {
      if (message === 'EMAIL_EXISTS') {
        const errorObject = {
          email: 'Пользователь с таким email уже существует',
        };
        throw errorObject;
      }
      if (message === 'EMAIL_NOT_FOUND' || message === 'INVALID_PASSWORD') {
        const errorObject = {
          email: 'Логин или пароль не совпадают',
          password: 'Логин или пароль не совпадают',
        };
        throw errorObject;
      }
    }
  };

  return (
    <AuthContext.Provider value={{ signUp, currentUser, isLoading, login }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
