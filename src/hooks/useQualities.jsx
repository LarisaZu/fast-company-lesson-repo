import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import qualityApi from '../services/quality-api';

const QualityContext = React.createContext();

export const useQualities = () => {
  return useContext(QualityContext);
};

export const QualityProvider = ({ children }) => {
  const [qualities, setQualities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await qualityApi.get();

        if (data) {
          setQualities(Object.values(data));
        }
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

  const getUserQualities = array => {
    return qualities.filter(el => array.indexOf(el._id) !== -1);
  };

  const errorCatcher = () => {
    const { message } = error.response.data;
    setError(message);
  };

  return (
    <QualityContext.Provider value={{ qualities, isLoading, getUserQualities }}>
      {children}
    </QualityContext.Provider>
  );
};

QualityProvider.propTypes = {
  children: PropTypes.node,
};
