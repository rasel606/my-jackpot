// // components/member/Funds/SimpleFundsPage.jsx
// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Deposit from "./Deposit";

// import Withrawal from "./Withdrawal";

// const FundsPage = ({ showError, showSuccess, showWarning, showInfo }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("deposit");

//   // Update active tab based on current route
//   React.useEffect(() => {
//     const path = location.pathname;
//     if (path.includes("withdrawal")) {
//       setActiveTab("withdrawal");
//     } else {
//       setActiveTab("deposit");
//     }
//   }, [location.pathname]);

//   // Handle tab change with navigation
//   const handleTabChange = (tabId) => {
//     setActiveTab(tabId);
//     if (tabId === "withdrawal") {
//       navigate("/withdrawal", {
//         state: { background: location.state?.background || location }
//       });
//     } else {
//       navigate("/deposit", {
//         state: { background: location.state?.background || location }
//       });
//     }
//   };

//   // Simple Deposit Component

//   // Simple Withdrawal Component

//   const renderContent = () => {
//     if (activeTab === "deposit") {
//       return <Deposit />;
//     } else {
//       return <Withrawal />;
//     }
//   };

//   return (
//     <div className="member-content funds-page">
//       {/* Tab Navigation */}
//       <div className="tab-btn-section tab-btn-wrap">
//         <div className="tab-btn tab-btn-bar">
//           <div
//             className="line"
//             style={{
//               width: 'calc(50%)',
//               transform: `translate(${activeTab === 'deposit' ? '0%' : '100%'}, 0px)`
//             }}
//           ></div>
//           <div
//             className={`btn ${activeTab === "deposit" ? "active" : ""}`}
//             onClick={() => handleTabChange("deposit")}
//           >
//             <div className="text">
//               Deposit <div className="badge"></div>
//             </div>
//           </div>
//           <div
//             className={`btn ${activeTab === "withdrawal" ? "active" : ""}`}
//             onClick={() => handleTabChange("withdrawal")}
//           >
//             <div className="text">
//               Withdrawal <div className="badge"></div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Tab Content */}
//       <div className="tab-content-wrap">
//         <div className="tab-content">
//           <div className="inner-wrap">
//             <div className="inner-box">
//               {renderContent()}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FundsPage;

// components/member/Funds/SimpleFundsPage.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import Deposit from "./Deposit";
import Withrawal from "./Withdrawal";

const FundsPage = ({ showError, showSuccess, showWarning, showInfo }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("deposit");

  // Update active tab based on current route
  React.useEffect(() => {
    const path = location.pathname;
    if (path.includes("withdrawal")) {
      setActiveTab("withdrawal");
    } else {
      setActiveTab("deposit");
    }
  }, [location.pathname]);

  // Handle tab change with navigation
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === "withdrawal") {
      navigate("/withdrawal", {
        state: { background: location.state?.background || location },
      });
    } else {
      navigate("/deposit", {
        state: { background: location.state?.background || location },
      });
    }
  };

  const renderContent = () => {
    if (activeTab === "deposit") {
      return <Deposit user={user} type={activeTab} />;
    } else {
      return <Withrawal />;
    }
  };

  return (
    <div className="popup-page-main__container">
      <div className="content mcd-style player-content fixed-tab">
        <div className="member-content funds-page">
          {/* Tab Navigation */}
          <div className="tab-btn-section tab-btn-wrap">
            <div className="tab-btn tab-btn-bar">
              <div
                className="line"
                style={{
                  width: "calc(50%)",
                  transform: `translate(${
                    activeTab === "deposit" ? "0%" : "100%"
                  }, 0px)`,
                }}
              ></div>
              <div
                className={`btn ${activeTab === "deposit" ? "active" : ""}`}
                onClick={() => handleTabChange("deposit")}
              >
                <div className="text">
                  ডিপোজিট <div className="badge"></div>
                </div>
              </div>
              <div
                className={`btn ${activeTab === "withdrawal" ? "active" : ""}`}
                onClick={() => handleTabChange("withdrawal")}
              >
                <div className="text">
                  উইথড্র <div className="badge"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Tips */}

          {/* Tab Content */}
          <div className="tab-content-wrap">
            <div className="tab-content">
              <div className="inner-wrap">
                <div className="inner-box">{renderContent()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundsPage;
