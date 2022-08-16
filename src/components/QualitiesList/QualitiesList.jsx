import PropTypes from 'prop-types';
import Quality from '../Quality/Quality';

const QualitiesList = ({ qualities }) => {
  return (
    <>
      {qualities.map(el => {
        return <Quality key={el._id} color={el.color} name={el.name} {...el} />;
      })}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array.isRequired,
};

export default QualitiesList;
