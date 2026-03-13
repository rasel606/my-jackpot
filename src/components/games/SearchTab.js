import React from 'react';

const SearchTab = ({ 
  providers, 
  selectedProvider, 
  onProviderChange, 
  showSearch, 
  setShowSearch 
}) => {
  const isAllSelected = selectedProvider === 'ALL' || 
                       (Array.isArray(selectedProvider) && selectedProvider.length === 0);

                       console.log(providers);
  return (
    <div className={`tab search-tab ${showSearch ? "active" : ""}`}>
      <ul className="item-ani">
        <li
          className={`condition-groups ${isAllSelected ? "active" : ""}`}
          onClick={() => onProviderChange("ALL")}
        >
          <div className="icon-all" />
          <p>ALL</p>
        </li>
        {providers?.map((provider) => (
          <li
            key={provider._id}
            className={`condition-groups ${
              Array.isArray(selectedProvider) && 
              selectedProvider.includes(provider.providercode) ? "active" : ""
            }`}
            onClick={() => onProviderChange(provider.providercode)}
          >
            <div className="provider-label">{provider.providercode}</div>
          </li>
        ))}
      </ul>
      <div className="btn search-btn" onClick={() => setShowSearch(!showSearch)}>
        <span className="item-icon" style={{
            maskImage: 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-search-type02.svg?v=1761024116679")'
          }}/>
      </div>
    </div>
  );
};

export default SearchTab;