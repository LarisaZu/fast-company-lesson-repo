import PropTypes from 'prop-types';
import Quality from '../Quality/Quality';
import { useQualities } from '../../hooks/useQualities';

const QualitiesList = ({ qualities }) => {
  const { isLoading, getUserQualities } = useQualities();

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
