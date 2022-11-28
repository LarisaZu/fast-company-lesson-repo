import { useState } from 'react';
import PropTypes from 'prop-types';

const TextInput = ({
  label,
  value,
  name,
  className,
  type = 'text',
  placeholder,
  onChange,
  error,
  onKeyDown,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const getInputClasses = () => {
    if (name === 'email' || name === 'password' || name === 'name') {
      return 'form-control' + (error ? ' is-invalid' : '');
    }
    return className;
  };

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="w-100 mb-4">
      {label && <label htmlFor={name}>{label}</label>}
      <div className="input-group has-validation">
        <input
          id={name}
          type={showPassword ? 'text' : type}
          name={name}
          value={value}
          autoComplete="off"
          className={getInputClasses()}
          onChange={onChange}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
          {...rest}
        />
        {type === 'password' && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={toggleShowPassword}
          >
            <i className={'bi bi-eye' + (showPassword ? '-slash' : '')}></i>
          </button>
        )}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

export default TextInput;

TextInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  placeholder: PropTypes.string,
};
