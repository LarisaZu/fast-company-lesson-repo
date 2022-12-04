import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CustomLoader from '../../components/CustomLoader';
import userContext from './userContext';
import userApi from '../../services/user-api';
import { toast } from 'react-toastify';

export default function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { content } = await userApi.get();
        console.log(
          '🚀 ~ file: UserProvider.jsx:17 ~ fetchData ~ content',
          content,
        );
        setUsers(content);
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

  const errorCatcher = () => {
    const { message } = error.response.data;
    setError(message);
  };

  return (
    <userContext.Provider value={{ users, isLoading }}>
      {isLoading ? <CustomLoader /> : children}
    </userContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node,
};
