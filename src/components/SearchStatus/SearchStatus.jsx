import PropTypes from 'prop-types';

const SearchStatus = ({ num }) => {
  const renderPhrase = num => {
    const lastOne = Number(num.toString().slice(-1));
    if (num > 4 && num < 15) {
      return 'человек тусанет';
    }
    if ([2, 3, 4].indexOf(lastOne) !== -1) return 'человека тусанет';
    return 'человек тусанет';
  };

  return (
    <h2
      className={'badge bg-' + (num > 0 ? 'primary' : 'danger') + ' p-2 fs-4'}
    >
      {num > 0
        ? `${num} ${renderPhrase(num)} с тобой сегодня`
        : 'Никто не хочет тусить с тобой'}
    </h2>
  );
};

SearchStatus.propTypes = {
  num: PropTypes.number.isRequired,
};

export default SearchStatus;
