// // components/common/TabNavigation.jsx
// import React from "react";

// const TabNavigation = ({ tabs, activeTab, onTabChange }) => {
//   const activeIndex = tabs.findIndex((tab) => tab.value === activeTab);
//   const lineStyle = {
//     width: `calc(${100 / tabs.length}%)`,
//     transform: `translate(${activeIndex * 100}%, 0px)`,
//   };

//   return (
//     <div className="tab-btn-section tab-btn-wrap">
//         <div className="tab-btn tab-btn-bar">
//       <div
//         className="line"
//         style={{
//           width: "calc(50%)",
//           transform: `translate(${
//             activeTab === tabs.value ? "0%" : "100%"
//           }, 0px)`,
//         }}
//       ></div>
//       {tabs.map((tab) => (
//         <>
        
//         <div
//           key={tab.value}
//           className={`btn ${activeTab === tab.value ? "active" : "completed"}`}
//           onClick={() => onTabChange(tab.value)}
//         >
//           <div className="text">{tab.label}</div>
//         </div>
//       </>
//       ))}
//     </div>
//     </div>
//   );
// };

// export default TabNavigation;


// components/common/TabNavigation.jsx
import React from "react";

const TabNavigation = ({ tabs, activeTab, onTabChange }) => {
  // Find which tab is active
  const activeIndex = tabs.findIndex((tab) => tab.key === activeTab);

  return (
    <div className="tab-btn-section tab-btn-wrap">
      <div className="tab-btn tab-btn-bar">
        {/* Active line animation */}
        <div
          className="line"
          style={{
            width: `calc(100% / ${tabs.length})`,
            transform: `translateX(${activeIndex * 100}%)`,
            transition: "transform 0.3s ease, width 0.3s ease",
          }}
        />

        {/* Render Tabs */}
        {tabs.map((tab) => (
          <div
            key={tab.key}
            className={`btn ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => onTabChange(tab.key)}
          >
            <div className="text">{tab.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;
