import PropTypes from 'prop-types';

const SelectField = ({
  options,
  label,
  defaultOption = 'Выберите вариант...',
  value,
  onChange,
  name,
  error,
}) => {
  const getSelectClasses = () => {
    return 'form-select' + (error ? ' is-invalid' : '');
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className={getSelectClasses()}
        id={name}
        value={value}
        onChange={onChange}
        name={name}
      >
        <option disabled value="">
          {defaultOption}
        </option>
        {options.length > 0 &&
          options.map(({ _id, name }) => (
            <option value={_id} key={_id}>
              {name}
            </option>
          ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default SelectField;

SelectField.propTypes = {
  options: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  defaultOption: PropTypes.string,
  // value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
};
