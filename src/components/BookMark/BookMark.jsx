import PropTypes from 'prop-types';

const BookMark = ({ status, ...rest }) => {
  return (
    <button {...rest} width="32" height="32">
      <i className={'bi bi-bookmark' + (status ? '-heart-fill' : '')}></i>
    </button>
  );
};

BookMark.propTypes = {
  status: PropTypes.bool.isRequired,
};

export default BookMark;
