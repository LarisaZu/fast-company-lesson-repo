import { useContext } from 'react';
import PropTypes from 'prop-types';
import Quality from '../Quality/Quality';
import qualityContext from '../../context/quality/qualityContext';

const QualitiesList = ({ qualities }) => {
  const { isLoading, getUserQualities } = useContext(qualityContext);

  const userQualities = getUserQualities(qualities);

  return (
    <>
      {isLoading
        ? 'loading...'
        : userQualities.map(el => {
            return (
              <Quality key={el._id} color={el.color} name={el.name} {...el} />
            );
          })}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array.isRequired,
};

export default QualitiesList;
