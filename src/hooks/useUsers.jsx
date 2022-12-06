import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import userApi from '../services/user-api';

const UsersContext = React.createContext();

export const useUsers = () => {
  return useContext(UsersContext);
};

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await userApi.get();

        setUsers(Object.values(res));
      } catch (error) {
        errorCatcher();
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: 'top-center',
      });
    }
  }, [error]);

  const getUserById = async id => {
    try {
      const res = await userApi.getById(id);
      return res;
    } catch (error) {
      errorCatcher();
    }
  };

  const identifyUserById = id => users.filter(el => el._id === id)[0];

  const errorCatcher = () => {
    const { message } = error.response.data;
    setError(message);
  };

  return (
    <UsersContext.Provider
      value={{ users, isLoading, getUserById, identifyUserById }}
    >
      {children}
    </UsersContext.Provider>
  );
};

UsersProvider.propTypes = {
  children: PropTypes.node,
};
