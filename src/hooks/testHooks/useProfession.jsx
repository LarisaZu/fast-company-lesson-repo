import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import professionApi from '../../services/profession-api';

const ProfessionContext = React.createContext();

const ProfessionProvider = ({ children }) => {
  const [professions, setProfessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await professionApi.get();
        setProfessions(data.content);
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

  const getProfessionById = id => {
    return professions.find(el => el._id === id);
  };

  const errorCatcher = () => {
    const { message } = error.response.data;
    setError(message);
  };

  return (
    <ProfessionContext.Provider
      value={{ professions, isLoading, getProfessionById }}
    >
      {children}
    </ProfessionContext.Provider>
  );
};

ProfessionProvider.propTypes = {
  children: PropTypes.node,
};
