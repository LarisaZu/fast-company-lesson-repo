import PropTypes from 'prop-types';
import './Textarea.css';

const Textarea = ({
  label,
  value,
  name,
  placeholder = '',
  onChange,
  error,
  rows,
  ...rest
}) => {
  const getInputClasses = () => {
    return 'form-control' + (error ? ' is-invalid' : '');
  };

  return (
    <div className="w-100 mb-4">
      {label && (
        <label htmlFor={name} className="mb-2">
          {label}
        </label>
      )}
      <div className="input-group has-validation">
        <textarea
          id={name}
          name={name}
          value={value}
          autoComplete="off"
          className={getInputClasses()}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          {...rest}
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

export default Textarea;

Textarea.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  rows: PropTypes.string,
};
