import PropTypes from 'prop-types';

const RadioInput = ({ options, value, label, onChange, name }) => {
  return (
    <div className="mb-4">
      <div>
        <label className="form-label">{label}</label>
      </div>
      {options.map(option => (
        <div className="form-check form-check-inline" key={option.value}>
          <input
            className="form-check-input"
            type="radio"
            name={name}
            checked={option.value === value}
            id={option.value}
            value={option.value}
            onChange={onChange}
          />
          <label htmlFor={option.value} className="form-label">
            {option.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioInput;

RadioInput.propTypes = {
  options: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
