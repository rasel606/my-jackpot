import React, { useState } from "react";

const PasswordInput = ({
  label,
  value,
  onChange,
  onClear,
  placeholder,
  error,
  disabled,
  children,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="input-group password ng-star-inserted">
      <div
        className={`eyes ${showPassword ? "eyes-show" : "eyes-hide"}`}
        onClick={!disabled ? toggleVisibility : undefined}
      ></div>
      {label && <label style={{ display: "block" }}>{label}</label>}
      <div className="input-wrap password-wrap">
        <input
          className={`input ${value ? "has-value" : ""} ${
            error ? "invalid" : value ? "valid" : ""
          }`}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder || label}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
        {value && onClear && (
          <button className="clear" type="button" onClick={onClear} disabled={disabled}>
            ✕
          </button>
        )}
      </div>
      {children}
    </div>
  );
};

export default PasswordInput;