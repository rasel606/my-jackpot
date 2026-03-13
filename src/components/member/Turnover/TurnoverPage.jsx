// import React, { useState, useEffect } from "react";
// import { usePopup } from "../../layouts/PopupManager";

// import TurnoverCard from "./TurnoverCard";
// import TurnoverDetailPopup from "./TurnoverDetailPopup";
// import TabNavigation from "./TabNavigation";
// import { useApp } from "../../../contexts/AppContext";

// const TurnoverPage = ({ showError, showSuccess, showWarning, showInfo }) => {
//   const { openPopup, closePopup } = usePopup();
//   const { 
//     turnoverData, 
//     fetchActiveTurnover, 
//     fetchCompletedTurnover,
//     fetchAllTurnoverData 
//   } = useApp();
  
//   const [activeTab, setActiveTab] = useState("active");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const tabs = [
//     { key: "active", label: "Active" },
//     { key: "completed", label: "Completed" },
//   ];

//   // Fetch data based on active tab
//   const fetchTabData = async (tabKey) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       if (tabKey === "active") {
//         await fetchActiveTurnover();
//       } else if (tabKey === "completed") {
//         await fetchCompletedTurnover();
//       }
//     } catch (err) {
//       console.error(`Error fetching ${tabKey} turnover:`, err);
//       setError(`Failed to load ${tabKey} turnover data`);
//       showError(`Failed to load ${tabKey} turnover data`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Initial data load
//   useEffect(() => {
//     fetchAllTurnoverData().finally(() => {
//       setLoading(false);
//     });
//   }, [fetchAllTurnoverData]);

//   const handleTabChange = async (tabKey) => {
//     setActiveTab(tabKey);
    
//     // Fetch data for the new tab if not already loaded
//     if ((tabKey === "active" && turnoverData.active.length === 0) || 
//         (tabKey === "completed" && turnoverData.completed.length === 0)) {
//       await fetchTabData(tabKey);
//     }
//   };

//   const handleDetailClick = (turnover) => {
//     openPopup(
//       <TurnoverDetailPopup turnover={turnover} onClose={closePopup} />,
//       {
//         title: "Turnover Details",
//         size: "medium",
//         position: "center",
//         closeOnBackdrop: true,
//         closeOnEscape: true,
//       }
//     );
//   };

//   const handleRetry = () => {
//     fetchTabData(activeTab);
//   };

//   // Get filtered data based on active tab
//   const filteredData = activeTab === "completed" 
//     ? turnoverData.completed 
//     : turnoverData.active;

//   if (loading && turnoverData.active.length === 0 && turnoverData.completed.length === 0) {
//     return (
//       <div className="turnover-loading">
//         <div className="loading-spinner"></div>
//         <p>লোড হচ্ছে...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="turnover-error">
//         <div className="error-icon">⚠️</div>
//         <p>{error}</p>
//         <button onClick={handleRetry} className="retry-button">
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="turnover-page">
//       {/* Tab Navigation */}
//       <TabNavigation
//         tabs={tabs}
//         activeTab={activeTab}
//         onTabChange={handleTabChange}
//       />

//       {/* Loading state for tab switch */}
//       {loading && (turnoverData.active.length > 0 || turnoverData.completed.length > 0) && (
//         <div className="tab-loading">
//           <div className="loading-spinner small"></div>
//           <p>Loading...</p>
//         </div>
//       )}

//       {/* Turnover List */}
//       <div className="turnover-content">
//         <ul className="ticket-wrap">
//           {filteredData.length > 0 ? (
//             filteredData.map((turnover) => (
//               <TurnoverCard
//                 key={turnover.id}
//                 turnover={turnover}
//                 onDetailClick={handleDetailClick}
//               />
//             ))
//           ) : (
//             <div className="no-data">
//               <p>No {activeTab} turnover records found</p>
//             </div>
//           )}
//         </ul>

//         {filteredData.length > 0 && (
//           <div className="prompt">－end of page－</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TurnoverPage;

// components/turnover/TurnoverPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePopup } from "../../layouts/PopupManager";
import { useApp } from "../../../contexts/AppContext";
import TurnoverCard from "./TurnoverCard";
import TurnoverDetailPopup from "./TurnoverDetailPopup";

const TurnoverPage = ({ showError, showSuccess, showWarning, showInfo }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { openPopup, closePopup } = usePopup();
  const { 
    turnoverData, 
    fetchActiveTurnover, 
    fetchCompletedTurnover,
    fetchAllTurnoverData 
  } = useApp();
  
  const [activeTab, setActiveTab] = useState("active");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Safe data access with fallbacks
  const safeTurnoverData = {
    active: turnoverData?.active || [],
    completed: turnoverData?.completed || []
  };

  // Update active tab based on current route
  React.useEffect(() => {
    const path = location.pathname;
    if (path.includes("completed")) {
      setActiveTab("completed");
    } else {
      setActiveTab("active");
    }
  }, [location.pathname]);

  // Handle tab change with navigation
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === "completed") {
      navigate("/turnover/completed", { 
        state: { background: location.state?.background || location }
      });
    } else {
      navigate("/turnover/active", { 
        state: { background: location.state?.background || location }
      });
    }
  };

  // Fetch data based on active tab
  const fetchTabData = async (tabKey) => {
    try {
      setLoading(true);
      setError(null);
      
      if (tabKey === "active") {
        await fetchActiveTurnover();
      } else if (tabKey === "completed") {
        await fetchCompletedTurnover();
      }
    } catch (err) {
      console.error(`Error fetching ${tabKey} turnover:`, err);
      const errorMessage = `${tabKey} টার্নওভার ডেটা লোড করতে ব্যর্থ হয়েছে`;
      setError(errorMessage);
      if (showError) showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Initial data load
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        await fetchAllTurnoverData();
      } catch (err) {
        console.error('Error loading initial data:', err);
        setError('প্রাথমিক ডেটা লোড করতে ব্যর্থ হয়েছে');
        if (showError) showError('প্রাথমিক ডেটা লোড করতে ব্যর্থ হয়েছে');
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, [fetchAllTurnoverData, showError]);

  // Fetch data when tab changes via navigation
  useEffect(() => {
    if ((activeTab === "active" && safeTurnoverData.active.length === 0) || 
        (activeTab === "completed" && safeTurnoverData.completed.length === 0)) {
      fetchTabData(activeTab);
    }
  }, [activeTab, safeTurnoverData.active.length, safeTurnoverData.completed.length]);

  const handleDetailClick = (turnover) => {
    openPopup(
      <TurnoverDetailPopup turnover={turnover} onClose={closePopup} />,
      {
        title: "টার্নওভার বিস্তারিত",
        size: "medium",
        position: "center",
        closeOnBackdrop: true,
        closeOnEscape: true,
      }
    );
  };

  const handleRetry = () => {
    fetchTabData(activeTab);
  };

  // Get filtered data based on active tab
  const filteredData = activeTab === "completed" 
    ? safeTurnoverData.completed 
    : safeTurnoverData.active;

  const renderContent = () => {
    if (loading && safeTurnoverData.active.length === 0 && safeTurnoverData.completed.length === 0) {
      return (
        <div className="turnover-loading">
          <div className="loading-spinner"></div>
          <p>লোড হচ্ছে...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="turnover-error">
          <div className="error-icon">⚠️</div>
          <p>{error}</p>
          <button onClick={handleRetry} className="retry-button">
            আবার চেষ্টা করুন
          </button>
        </div>
      );
    }

    return (
      <div className="turnover-content">
        {/* Loading state for tab switch */}
        {loading && (safeTurnoverData.active.length > 0 || safeTurnoverData.completed.length > 0) && (
          <div className="tab-loading">
            <div className="loading-spinner small"></div>
            <p>লোড হচ্ছে...</p>
          </div>
        )}

        <div className="ticket-wrap">
          {filteredData.length > 0 ? (
            filteredData.map((turnover) => (
              <TurnoverCard
                key={turnover.id}
                turnover={turnover}
                onDetailClick={handleDetailClick}
              />
            ))
          ) : (
            <div className="no-data">
              <p>{activeTab === 'active' ? 'কোন সক্রিয় টার্নওভার রেকর্ড পাওয়া যায়নি' : 'কোন সম্পন্ন টার্নওভার রেকর্ড পাওয়া যায়নি'}</p>
            </div>
          )}
        </div>

        {filteredData.length > 0 && (
          <div className="prompt">－পৃষ্ঠার শেষ－</div>
        )}
      </div>
    );
  };

  return (
    <div className="popup-page-wrapper active">
      <div className="popup-page show-toolbar popup-page--active popup-page--align-top">
        <div className="popup-page__backdrop" onClick={() => navigate(-1)}></div>
        <div className="popup-page__main popup-page-main popup-page-main--show">
          {/* Header */}
          <div className="popup-page-main__header wallet-header">
            <div className="popup-page-main__title">টার্নওভার</div>
            <div
              className="popup-page-main__close ng-star-inserted"
              onClick={() => navigate(-1)}
            >
              ✕
            </div>
          </div>

          {/* Content */}
          <div className="popup-page-main__container">
            <div className="content mcd-style player-content fixed-tab">
              <div className="member-content turnover-page">
                {/* Tab Navigation */}
                <div className="tab-btn-section tab-btn-wrap">
                  <div className="tab-btn tab-btn-bar">
                    <div 
                      className="line" 
                      style={{ 
                        width: 'calc(50%)', 
                        transform: `translate(${activeTab === 'active' ? '0%' : '100%'}, 0px)` 
                      }}
                    ></div>
                    <div
                      className={`btn ${activeTab === "active" ? "active" : ""}`}
                      onClick={() => handleTabChange("active")}
                    >
                      <div className="text">
                        সক্রিয় <div className="badge"></div>
                      </div>
                    </div>
                    <div
                      className={`btn ${activeTab === "completed" ? "active" : ""}`}
                      onClick={() => handleTabChange("completed")}
                    >
                      <div className="text">
                        সম্পন্ন <div className="badge"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tab Content */}
                <div className="tab-content-wrap">
                  <div className="tab-content">
                    <div className="inner-wrap">
                      <div className="inner-box">
                        {renderContent()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TurnoverPage;