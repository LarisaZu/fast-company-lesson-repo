import PropTypes from 'prop-types';
import Card from '../Card';

const MeetingsCard = ({ count }) => {
  return (
    <Card
      styles="mb-3"
      bodyStyles="d-flex flex-column justify-content-center text-center"
    >
      <h5 className="card-title">
        <span>Completed meetings</span>
      </h5>

      <h1 className="display-1">{count}</h1>
    </Card>
  );
};

MeetingsCard.propTypes = {
  count: PropTypes.number.isRequired,
};

export default MeetingsCard;
