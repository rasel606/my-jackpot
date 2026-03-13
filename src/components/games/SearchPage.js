
// const SearchPage = ({
//   showSearch,
//   setShowSearch,
//   providers,
//   selectedProvider,
//   onProviderChange,
//   searchQuery,
//   setSearchQuery,
// }) => (


//   <div className={`searchpage ${showSearch ? "active" : ""}`}>
//     {console.log(showSearch)}
//     <div className="search-top-info">
//       <div className="back" onClick={() => setShowSearch(false)}>
//         <span className="item-icon"></span> Back
//       </div>
//       <div
//         className="icon-search"
//         style={{
//           maskImage:
//             'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-search-type02.svg?v=1745315543147")',
//         }}
//       ></div>
//       <input
//         type="text"
//         placeholder="Search Games"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//       />
//     </div>

//     <div className="searchpage-main">
//       <div className="search-checkbox-group check-group">
//         <h2>Providers</h2>
//         <ul>
//           {providers.map((provider) => (
//             <li key={provider.providercode}>
//               <input
//                 type="checkbox"
//                 id={`search-${provider.providercode}`}
//                 checked={selectedProvider.includes(provider.providercode)}
//                 onChange={() => onProviderChange(provider.providercode)}
//               />
//               <label htmlFor={`search-${provider.providercode}`}>
//                 {provider.company}
//               </label>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="search-checkbox-group check-group">
//         <h2>GameCategoryType</h2>
//         <ul>
//           <li>
//             <input type="radio" id="category-slots" checked={true} readOnly />
//             <label htmlFor="category-slots">SLOTS</label>
//           </li>
//         </ul>
//       </div>
//     </div>

//     <div className="searchpage-bar active">
//       <button className="button" onClick={() => setShowSearch(false)}>
//         Confirm
//       </button>
//     </div>
//   </div>
// );

// export default SearchPage




import React from 'react';

const SearchPage = ({
  showSearch,
  setShowSearch,
  providers,
  selectedProvider,
  onProviderChange,
  searchQuery,
  setSearchQuery,
}) => {
  
  const getProviderDisplayName = (provider) => {
    const code = provider.providercode || provider.code || '';
    const name = provider.company || code;
    
    const emojiMap = {
      'JILI': '🔥',
      'JDB': '🔥', 
      'PP': '🔥',
      'PG': '🔥',
      'FC': '🔥',
      'RICH88': '🔥',
      'YELLOWBAT': '🔥',
      'FASTSPIN': '🔥',
      'SG': '🔥',
      'NextSpin': '🔥',
      'FIVEG': '🌈'
    };

    const emoji = emojiMap[code] || '';
    return `${emoji}${name}`;
  };

  const handleProviderToggle = (providerCode) => {
    onProviderChange(providerCode);
  };

  const handleConfirm = () => {
    setShowSearch(false);
  };

  return (
    <div className={`searchpage ${showSearch ? "active" : ""}`}>
      <div className="search-top-info">
        <div className="back" onClick={() => setShowSearch(false)}>
          <span 
            className="item-icon"
            style={{
              maskImage: 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-arrow-type09.svg?v=1761024116679")'
            }}
          ></span>
          Back
        </div>
        <div 
          className="icon-search"
          style={{
            maskImage: 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-search-type02.svg?v=1761024116679")'
          }}
        ></div>
        <input
          type="text"
          placeholder="Search Games"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="ng-untouched ng-pristine ng-valid"
        />
      </div>

      <div className="searchpage-main">
        {/* Providers Section */}
        <div className="search-checkbox-group check-group">
          <h2>Providers</h2>
          <ul>
            {providers?.map((provider) => (
              <li key={provider._id}>
                <input
                  type="checkbox"
                  id={`search-${provider.providercode}`}
                  checked={Array.isArray(selectedProvider) && 
                           selectedProvider.includes(provider.providercode)}
                  onChange={() => handleProviderToggle(provider.providercode)}
                  className="ng-untouched ng-pristine ng-valid"
                />
                <label htmlFor={`search-${provider.providercode}`}>
                  {getProviderDisplayName(provider)}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Game Category Type Section */}
        <div className="search-checkbox-group check-group">
          <h2>GameCategoryType</h2>
          <ul>
            <li>
              <input 
                type="radio" 
                id="category-slots" 
                name="category"
                checked={true} 
                readOnly 
                className="ng-untouched ng-pristine ng-valid"
              />
              <label htmlFor="category-slots">SLOTS</label>
            </li>
          </ul>
        </div>
      </div>

      <div className={`searchpage-bar ${showSearch ? "active" : ""}`}>
        <button className="button" onClick={handleConfirm}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default SearchPage;