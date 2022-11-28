import PropTypes from 'prop-types';
import QualitiesList from '../QualitiesList';
import Card from '../Card';

const QualitiesCard = ({ qualities }) => {
  return (
    <Card
      styles="mb-3"
      bodyStyles="d-flex flex-column justify-content-center text-center"
    >
      <h5 className="card-title">
        <span>Qualities</span>
      </h5>
      <div className="card-text">
        <QualitiesList qualities={qualities} />
      </div>
    </Card>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array.isRequired,
};

export default QualitiesCard;
