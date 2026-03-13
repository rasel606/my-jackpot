// components/auth/CountrySelector.jsx
import React, { useState } from 'react';

const CountrySelector = ({ value, onChange, disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const countries = [
    { code: 'BD', name: 'Bangladesh', dialCode: '+880', flag: 'https://img.s628b.com/sb/h5/assets/images/flag/BD.png?v=1760412521693' },
    { code: 'US', name: 'United States', dialCode: '+1', flag: 'https://img.s628b.com/sb/h5/assets/images/flag/US.png?v=1760412521693' },
    { code: 'UK', name: 'United Kingdom', dialCode: '+44', flag: 'https://img.s628b.com/sb/h5/assets/images/flag/UK.png?v=1760412521693' },
    { code: 'IN', name: 'India', dialCode: '+91', flag: 'https://img.s628b.com/sb/h5/assets/images/flag/IN.png?v=1760412521693' },
  ];

  const selectedCountry = countries.find(country => country.dialCode === value) || countries[0];

  const handleCountrySelect = (country) => {
    onChange(country.dialCode);
    setIsOpen(false);
  };

  return (
    <div className="phone-area-code">
      <div className="lang-select">
        <button 
          type="button"
          className="btn-select only"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
        >
          <div className="country-option">
            <img 
              src={selectedCountry.flag} 
              alt={selectedCountry.code} 
              loading="lazy" 
            />
            <span>{selectedCountry.dialCode}</span>
          </div>
        </button>
        
        {isOpen && !disabled && (
          <div className="country-dropdown">
            {countries.map(country => (
              <div
                key={country.code}
                className="country-option dropdown-option"
                onClick={() => handleCountrySelect(country)}
              >
                <img src={country.flag} alt={country.code} />
                <span>{country.name} ({country.dialCode})</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CountrySelector;