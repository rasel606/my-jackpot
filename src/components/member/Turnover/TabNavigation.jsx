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
