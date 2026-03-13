// components/auth/InputField.jsx
import React from 'react';

const InputField = ({ 
  label, 
  type = 'text', 
  value, 
  placeholder, 
  error, 
  onChange, 
  removeWhitespace = false,
  disabled = false,
  ...props 
}) => {
  const handleChange = (e) => {
    let newValue = e.target.value;
    if (removeWhitespace) {
      newValue = newValue.replace(/\s/g, '');
    }
    onChange(newValue);
  };

  const handleClear = () => {
    if (!disabled) {
      onChange('');
    }
  };

  return (
    <div className="input-group third-party-input-group-title">
      <label>{label}</label>
      <input
        type={type}
        className={`input ${error ? 'error' : ''} ${value && !error ? 'valid' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        {...props}
      />
      {value && !disabled && (
        <input 
          className="clear active" 
          type="button"
          onClick={handleClear}
        />
      )}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default InputField;