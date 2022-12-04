import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import qualityContext from './qualityContext';
import qualityApi from '../../services/quality-api';

export default function QualityProvider({ children }) {
  const [qualities, setQualities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await qualityApi.get();

        setQualities(data.content);
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
    <qualityContext.Provider value={{ qualities, isLoading, getUserQualities }}>
      {children}
    </qualityContext.Provider>
  );
}

QualityProvider.propTypes = {
  children: PropTypes.node,
};
