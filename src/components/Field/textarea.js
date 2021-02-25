import React from 'react';
import PropTypes from 'prop-types';

import './field.scss';

const TextArea = ({
  inputClassName,
  label,
  id,
  type,
  name,
  value,
  required,
  placeholder,
  errors,
  onChange,
  onBlur,
}) => {
  const handleChange = (e) => {
    if (type === 'checkbox') {
      onChange(e.target.checked, name);
    }
    else {
      onChange(e.target.value, name);
    }
  };

  const handleBlur = (e) => {
    onBlur(e.target.value, name);
  };

  return (
    <div className="form-field">
      <label
        className="form-label"
        htmlFor={id}
      >
        {label}
      </label>

      <textarea
        className={inputClassName}
        name={name}
        id={id}
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        checked={value}
      />

      {type !== 'checkbox' && (
        <div className="errors">
          {errors}
        </div>
      )}
    </div>
  );
};

TextArea.propTypes = {
  inputClassName: PropTypes.string,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  errors: PropTypes.string,
};

TextArea.defaultProps = {
  inputClassName: 'form-input',
  value: '',
  type: 'text',
  required: true,
  placeholder: '',
  errors: null,
};

export default TextArea;
