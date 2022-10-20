import PropTypes from 'prop-types';

const TextInput = ({
  label,
  value,
  name,
  className,
  type = 'text',
  placeholder,
  onChange,
}) => {
  return (
    <div className="w-100">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        autoComplete="off"
        className={className}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInput;

TextInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};
