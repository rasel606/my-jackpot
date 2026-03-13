// components/popups/CurrencyLanguagePopup.jsx
import React, { useState } from 'react';
import McdPopupPage from '../../layouts/McdPopupPage';
import { useApp } from '../../../contexts/AppContext';



const CurrencyLanguagePopup = ({
  show = false,
  onClose,
  title = "Currency and Language",
//   currencies = defaultCurrencies,
  onCurrencyChange,
  onLanguageChange,
  initialCurrency = "BDT",
  initialLanguage = "English",
  showFlags = true
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState(initialCurrency);
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);
  const { updateSettings } = useApp();

  const defaultCurrencies = [
    { 
      code: "BDT", 
      symbol: "৳", 
      flag: "https://img.s628b.com/sb/h5/assets/images/flag/BD.png?v=1760412521693", 
      languages: ["বাংলা", "English"] 
    },
    { 
      code: "INR", 
      symbol: "₹", 
      flag: "https://img.s628b.com/sb/h5/assets/images/flag/IN.png?v=1760412521693", 
      languages: ["English", "हिंदी"] 
    },
    { 
      code: "USD", 
      symbol: "$", 
      flag: "https://img.s628b.com/sb/h5/assets/images/flag/US.png?v=1760412521693", 
      languages: ["English"] 
    },
    { 
      code: "PKR", 
      symbol: "₨", 
      flag: "https://img.s628b.com/sb/h5/assets/images/flag/PK.png?v=1760412521693", 
      languages: ["English"] 
    }
  ];

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency.code);
    updateSettings({ currency: currency.code });
    
    if (onCurrencyChange) {
      onCurrencyChange(currency);
      
    }
  };

  const handleLanguageSelect = (currencyCode, language) => {
    setSelectedLanguage(language);
    updateSettings({ language });
    if (onLanguageChange) {
      onLanguageChange({
        currencyCode,
        language
      });
    }
  };

  const isLanguageSelected = (currencyCode, language) => {
    return selectedCurrency === currencyCode && selectedLanguage === language;
  };

  return (
    <McdPopupPage
      show={show}
      onClose={onClose}
      position="center"
      size="medium"
      popupClass="pop-language"
    >
      <div className="pop-title">
        <h3>{title}</h3>
      </div>
      
      <div className="pop-inner content-style">
        <ul className="language-list">
          {(defaultCurrencies).map((currency, index) => (
            <li key={`${currency.code}-${index}`} className="language-item">
              <div 
                className="left-language-area"
                onClick={() => handleCurrencySelect(currency)}
              >
                {showFlags && (
                  <img
                    src={currency.flag}
                    alt={currency.code}
                    className="currency-flag"
                    loading="lazy"
                    width={24}
                    height={16}
                  />
                )}
                <p className="currency-info">
                  <span className="currency-symbol">{currency.symbol}</span> 
                  {currency.code}
                </p>
              </div>
              
              <div className="right-language-area">
                {currency.languages.map((language, langIndex) => (
                  <div 
                    key={`${currency.code}-${language}-${langIndex}`}
                    className="radio-box"
                  >
                    <input
                      type="radio"
                      name="language"
                      id={`${currency.code}${langIndex}`}
                      checked={isLanguageSelected(currency.code, language)}
                      onChange={() => handleLanguageSelect(currency.code, language)}
                      onClick={onClose}
                      className="language-radio"
                    />
                    <label 
                      htmlFor={`${currency.code}${langIndex}`}
                      className="language-label"
                    >
                      {language}
                    </label>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
        
        {/* <div style={{ padding: '20px', textAlign: 'center', borderTop: '1px solid #f0f0f0', marginTop: '20px' }}>
          <button
            onClick={onClose}
            style={{
              padding: '12px 32px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500'
            }}
          >
            Confirm Selection
          </button>
        </div> */}
      </div>
    </McdPopupPage>
  );
};

export default CurrencyLanguagePopup;