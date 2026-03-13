// import React from 'react';

// const SortBar = ({ sortOption, setSortOption, title = "Slots" }) => {
//   const sortOptions = [
//     { id: "recommend", label: "Recommend" },
//     { id: "latest", label: "Latest" },
//     { id: "favorite", label: "Favorite" },
//     { id: "aZ", label: "A-Z" },
//   ];

//   return (
//     <div className="sort-bar">
//       <div className="sort-bar__title">
//         <span>{title}</span>
//       </div>
//       <div className="sort-bar__box">
//         <div className="sort-bar__btn">
//           <span>Filter</span>
//           <span className="arrow" />
//         </div>
//         <ul className="sort-bar__select">
//           {sortOptions.map((option) => (
//             <li
//               key={option.id}
//               className={`sort-bar__select__item ${sortOption === option.id ? "active" : ""}`}
//               onClick={() => setSortOption(option.id)}
//             >
//               <span>{option.label}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default SortBar;




import React, { useState } from 'react';

const SortBar = ({ sortOption, setSortOption, title = "Games" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { id: "sort_recommend", label: "Recommend", value: "recommend" },
    { id: "sort_latest", label: "Latest", value: "latest" },
    { id: "sort_favorite", label: "Favorite", value: "favorite" },
    { id: "sort_aZ", label: "A-Z", value: "aZ" }
  ];

  const handleSortChange = (value) => {
    setSortOption(value);
    setIsOpen(false);
  };

  const currentSortLabel = sortOptions.find(opt => opt.value === sortOption)?.label || "Recommend";

  return (
    <div className={  `sort-bar`}>
      <div className="sort-bar__title">
        <span>{title}</span>
      </div>
      <div className= {  `  sort-bar__box ${isOpen ? 'show' : ''}`}>
        <div 
          className="sort-bar__btn" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{currentSortLabel}</span>
          <span 
            className="arrow"
            style={{
              maskImage: 'url("/assets/images/icon-set/icon-arrow-type06.svg")'
            }}
          ></span>
        </div>
        {isOpen && (
          <ul className={  `sort-bar__select ${isOpen ? 'show' : ''}`}>
            {sortOptions.map((option) => (
              <li
                key={option.id}
                className="sort-bar__select__item"
                id={option.id}
                onClick={() => handleSortChange(option.value)}
              >
                <span id={option.id}>{option.label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SortBar;