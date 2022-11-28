import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

const BackButton = ({ styles }) => {
  const history = useHistory();

  return (
    <button
      type="button"
      className={'btn btn-primary' + (styles ? ' ' + styles : '')}
      onClick={() => history.goBack()}
    >
      Назад
    </button>
  );
};

BackButton.propTypes = {
  styles: PropTypes.string,
};

export default BackButton;
