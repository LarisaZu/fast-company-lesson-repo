import Select from 'react-select';
import PropTypes from 'prop-types';
import CustomMultiValueLabel from './CustomMultiValueLabel';
import './CustomSelect.css';

const CustomSelect = ({
  isMulti = false,
  name,
  placeholder,
  options,
  getOptionLabel,
  getOptionValue,
  onChange,
  styles,
  error,
  label,
  value,
}) => {
  const getSelectClasses = () => {
    return error ? 'is-invalid' : 'valid';
  };

  return (
    <div className="mb-4">
      {label && <label className="form-label">{label}</label>}
      <Select
        classNamePrefix="react-select"
        className={getSelectClasses()}
        isMulti={isMulti}
        closeMenuOnSelect={!isMulti}
        name={name}
        value={value}
        placeholder={placeholder}
        components={{ MultiValueLabel: CustomMultiValueLabel }}
        options={options}
        getOptionValue={getOptionValue}
        getOptionLabel={getOptionLabel}
        onChange={onChange}
        noOptionsMessage={() => 'Не найдено'}
        styles={styles}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default CustomSelect;

CustomSelect.propTypes = {
  isMulti: PropTypes.bool,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  getOptionValue: PropTypes.func.isRequired,
  getOptionLabel: PropTypes.func.isRequired,
  error: PropTypes.string,
  label: PropTypes.string,
  styles: PropTypes.object,
};
