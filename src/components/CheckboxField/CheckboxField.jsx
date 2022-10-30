import PropTypes from 'prop-types';

const CheckboxField = ({ name, checked, onChange, children, error }) => {
  const getSelectClasses = () => {
    return 'form-check-input' + (error ? ' is-invalid' : '');
  };

  return (
    <div className="form-check mb-4">
      <input
        className={getSelectClasses()}
        type="checkbox"
        name={name}
        checked={checked}
        id={'Check-' + name}
        onChange={onChange}
      />
      <div>
        <label className="form-check-label" htmlFor={'Check-' + name}>
          {children}
        </label>
      </div>

      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default CheckboxField;

CheckboxField.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  error: PropTypes.string,
};
