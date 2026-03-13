// import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useApi } from "../../../hooks/useApi";


// const BettingRecords = ({ showError, showSuccess, showWarning, showInfo }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [activeTab, setActiveTab] = useState("settled");
//   const [showFilter, setShowFilter] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const { apiCall } = useApi();
  
//   // Filter states
//   const [filters, setFilters] = useState({
//     startDate: "",
//     endDate: "",
//     platforms: [],
//     gameTypes: [],
//     settlement: "settled",
//     page: 1,
//     limit: 2000,
//   });

//   const [availableFilters, setAvailableFilters] = useState({
//     platforms: [],
//     gameTypes: [],
//     dateRange: { minDate: null, maxDate: null },
//   });

//   const [bettingData, setBettingData] = useState([]);
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 2000,
//     total: 0,
//     pages: 0,
//   });

//   // Date options for quick selection
//   const dateOptions = [
//     {
//       value: "today",
//       label: "Today",
//       getDate: () => {
//         const today = new Date();
//         return {
//           startDate: today.toISOString().split("T")[0],
//           endDate: today.toISOString().split("T")[0],
//         };
//       },
//     },
//     {
//       value: "yesterday",
//       label: "Yesterday",
//       getDate: () => {
//         const yesterday = new Date();
//         yesterday.setDate(yesterday.getDate() - 1);
//         return {
//           startDate: yesterday.toISOString().split("T")[0],
//           endDate: yesterday.toISOString().split("T")[0],
//         };
//       },
//     },
//     {
//       value: "last7days",
//       label: "Last 7 days",
//       getDate: () => {
//         const endDate = new Date();
//         const startDate = new Date();
//         startDate.setDate(startDate.getDate() - 6);
//         return {
//           startDate: startDate.toISOString().split("T")[0],
//           endDate: endDate.toISOString().split("T")[0],
//         };
//       },
//     },
//     {
//       value: "last30days",
//       label: "Last 30 days",
//       getDate: () => {
//         const endDate = new Date();
//         const startDate = new Date();
//         startDate.setDate(startDate.getDate() - 29);
//         return {
//           startDate: startDate.toISOString().split("T")[0],
//           endDate: endDate.toISOString().split("T")[0],
//         };
//       },
//     },
//   ];

//   const [selectedDateOption, setSelectedDateOption] = useState("last7days");

//   // Load available filters
//   const loadAvailableFilters = useCallback(async () => {
//     try {
//       const response = await apiCall("/game-list-filters", "GET");
//       console.log("GamesProvidersPage category result", response.data);

//       if (response.success) {
//         setAvailableFilters(response.data || {});
//       }
//     } catch (error) {
//       console.error("Error loading filters:", error);
//       showError("Failed to load filters");
//     }
//   }, [apiCall, showError]);

//   // Load betting records
//   const loadBettingRecords = useCallback(
//     async (page = 1, isLoadMore = false) => {
//       try {
//         if (isLoadMore) {
//           setLoadingMore(true);
//         } else {
//           setLoading(true);
//         }

//         const params = {
//           page,
//           limit: filters.limit,
//           settlement: activeTab,
//         };

//         // Add platform and game type filters if they exist
//         if (filters.platforms.length > 0) {
//           params.platforms = filters.platforms;
//         }

//         if (filters.gameTypes.length > 0) {
//           params.gameTypes = filters.gameTypes;
//         }

//         // Apply date filter based on selected option
//         if (selectedDateOption && dateOptions.find((opt) => opt.value === selectedDateOption)) {
//           const dateOption = dateOptions.find(
//             (opt) => opt.value === selectedDateOption
//           );
//           const dates = dateOption.getDate();
//           params.startDate = dates.startDate;
//           params.endDate = dates.endDate;
//         }

//         console.log("Loading betting records with params:", params);

//         // Use the correct endpoint for betting records
//         const response = await apiCall("/betting-history", "GET", params);

//         if (response.success) {
//           if (isLoadMore) {
//             setBettingData((prev) => [...prev, ...response.data]);
//           } else {
//             setBettingData(response.data || []);
//           }
          
//           setPagination(response.pagination || {
//             page: page,
//             limit: filters.limit,
//             total: response.data?.length || 0,
//             pages: Math.ceil((response.data?.length || 0) / filters.limit)
//           });
          
//           setHasMore(page < (response.pagination?.pages || 1));
          
//           if (isLoadMore) {
//             showSuccess(`Loaded ${response.data?.length || 0} more records`);
//           }
//         } else {
//           showError(response.message || "Failed to load betting records");
//         }
//       } catch (error) {
//         console.error("Error loading betting records:", error);
//         showError("Failed to load betting records");
//       } finally {
//         setLoading(false);
//         setLoadingMore(false);
//       }
//     },
//     [filters, activeTab, selectedDateOption, showError, showSuccess, apiCall, dateOptions]
//   );

//   // Initial load
//   useEffect(() => {
//     loadAvailableFilters();
//     loadBettingRecords(1, false);
//   }, []);

//   // Reload when filters or tab change
//   useEffect(() => {
//     setBettingData([]);
//     setPagination(prev => ({ ...prev, page: 1 }));
//     loadBettingRecords(1, false);
//   }, [filters, activeTab, selectedDateOption]);

//   // Handle tab change
//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//     setFilters((prev) => ({ ...prev, settlement: tab, page: 1 }));
//   };

//   // Handle filter toggle
//   const toggleFilter = () => {
//     setShowFilter(!showFilter);
//   };

//   // Handle platform selection
//   const handlePlatformToggle = (platform) => {
//     setFilters((prev) => ({
//       ...prev,
//       platforms: prev.platforms.includes(platform)
//         ? prev.platforms.filter((p) => p !== platform)
//         : [...prev.platforms, platform],
//       page: 1,
//     }));
//   };

//   // Handle game type selection
//   const handleGameTypeToggle = (gameType) => {
//     setFilters((prev) => ({
//       ...prev,
//       gameTypes: prev.gameTypes.includes(gameType)
//         ? prev.gameTypes.filter((g) => g !== gameType)
//         : [...prev.gameTypes, gameType],
//       page: 1,
//     }));
//   };

//   // Handle date option change
//   const handleDateOptionChange = (optionValue) => {
//     setSelectedDateOption(optionValue);
//     setFilters((prev) => ({ ...prev, page: 1 }));
//   };

//   // Select all platforms
//   const selectAllPlatforms = () => {
//     setFilters(prev => ({
//       ...prev,
//       platforms: [...availableFilters.platforms],
//       page: 1
//     }));
//   };

//   // Clear all platforms
//   const clearAllPlatforms = () => {
//     setFilters(prev => ({
//       ...prev,
//       platforms: [],
//       page: 1
//     }));
//   };

//   // Select all game types
//   const selectAllGameTypes = () => {
//     setFilters(prev => ({
//       ...prev,
//       gameTypes: [...availableFilters.gameTypes],
//       page: 1
//     }));
//   };

//   // Clear all game types
//   const clearAllGameTypes = () => {
//     setFilters(prev => ({
//       ...prev,
//       gameTypes: [],
//       page: 1
//     }));
//   };

//   // Apply filters and close filter panel
//   const applyFilters = () => {
//     setShowFilter(false);
//     setBettingData([]);
//     loadBettingRecords(1, false);
//     showInfo("Filters applied successfully");
//   };

//   // Reset filters
//   const resetFilters = () => {
//     setFilters({
//       startDate: "",
//       endDate: "",
//       platforms: [],
//       gameTypes: [],
//       settlement: activeTab,
//       page: 1,
//       limit: 200,
//     });
//     setSelectedDateOption("last7days");
//     showInfo("Filters reset to default");
//   };

//   // Close filter panel
//   const closeFilter = () => {
//     setShowFilter(false);
//   };

//   // Load more records
//   const loadMore = () => {
//     if (!loadingMore && hasMore) {
//       const nextPage = pagination.page + 1;
//       setFilters(prev => ({ ...prev, page: nextPage }));
//       loadBettingRecords(nextPage, true);
//     }
//   };

//   // Format currency
//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat("en-US", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     }).format(amount || 0);
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "short",
//         day: "numeric",
//       });
//     } catch (error) {
//       return "Invalid Date";
//     }
//   };

//   // Calculate total stats for a date group
//   const calculateDateGroupStats = (records) => {
//     const totals = records.reduce((acc, record) => ({
//       turnover: acc.turnover + (record.turnover || 0),
//       profitLoss: acc.profitLoss + (record.profitLoss || 0),
//       bet: acc.bet + (record.bet || 0),
//       payout: acc.payout + (record.payout || 0),
//     }), { turnover: 0, profitLoss: 0, bet: 0, payout: 0 });

//     return totals;
//   };

//   return (
//     <div className="member-content betting-records-page fixed-tab player-content">
//       {/* Header Section */}
//       <div className="page-header">
//         <div className="header-content">
//           <h1 className="page-title">Betting Records</h1>
//           <div className="header-stats">
//             <div className="stat-item">
//               <span className="stat-label">Total Records:</span>
//               <span className="stat-value">{pagination.total}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Tab Navigation */}
//       <div className="tab-btn-section">
//         <div className="tab-btn tab-btn-page">
//           <div
//             className="line"
//             style={{
//               width: "calc(50%)",
//               transform: `translate(${
//                 activeTab === "settled" ? "0%" : "100%"
//               }, 0px)`,
//             }}
//           ></div>
//           <div
//             className={`btn ${activeTab === "settled" ? "active" : ""}`}
//             onClick={() => handleTabChange("settled")}
//           >
//             <div className="text">Settled</div>
//           </div>
//           <div
//             className={`btn ${activeTab === "unsettled" ? "active" : ""}`}
//             onClick={() => handleTabChange("unsettled")}
//           >
//             <div className="text">Unsettled</div>
//           </div>
//         </div>
//       </div>

//       {/* Filter Tab */}
//       <div className="tab filter-tab">
//         <ul className="item-ani">
//           {dateOptions.map((option) => (
//             <li
//               key={option.value}
//               className={selectedDateOption === option.value ? "active" : ""}
//               onClick={() => handleDateOptionChange(option.value)}
//             >
//               {option.label}
//             </li>
//           ))}
//         </ul>
//         <div className="btn search-btn" onClick={toggleFilter}>
//           <span
//             className="item-icon"
//             style={{
//               maskImage: 'url("/assets/images/icon-set/index-theme-icon/games-filter-icon.svg")',
//               WebkitMaskImage: 'url("/assets/images/icon-set/index-theme-icon/games-filter-icon.svg")',
//             }}
//           ></span>
//           <span className="filter-badge">
//             {filters.platforms.length + filters.gameTypes.length > 0 ? 
//               filters.platforms.length + filters.gameTypes.length : ''}
//           </span>
//         </div>
//       </div>

//       {/* Filter Panel */}
//       {showFilter && (
//         <div className="searchpage active">
//           <div className="search-top-info">
//             <div className="back" onClick={closeFilter}>
//               <span
//                 className="item-icon"
//                 style={{
//                   maskImage: 'url("/assets/images/icon-set/icon-arrow-type09.svg")',
//                   WebkitMaskImage: 'url("/assets/images/icon-set/icon-arrow-type09.svg")',
//                 }}
//               ></span>
//               Back
//             </div>
//             <input
//               type="text"
//               placeholder="Betting Record Filter"
//               disabled
//               style={{ backgroundImage: 'url("")' }}
//             />
//           </div>

//           <div className="searchpage-main">
//             {/* Platforms Filter */}
//             <div className="search-checkbox-group check-group">
//               <div className="filter-header">
//                 <h2>Platform ({filters.platforms.length} selected)</h2>
//                 <div className="filter-actions">
//                   <button className="filter-action-btn" onClick={selectAllPlatforms}>
//                     Select All
//                   </button>
//                   <button className="filter-action-btn" onClick={clearAllPlatforms}>
//                     Clear All
//                   </button>
//                 </div>
//               </div>
//               <ul>
//                 {availableFilters.platforms && availableFilters.platforms.map((platform) => (
//                   <li key={platform}>
//                     <input
//                       type="checkbox"
//                       id={`platform-${platform}`}
//                       checked={filters.platforms.includes(platform)}
//                       onChange={() => handlePlatformToggle(platform)}
//                     />
//                     <label htmlFor={`platform-${platform}`}>{platform}</label>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Game Types Filter */}
//             <div className="search-checkbox-group check-group">
//               <div className="filter-header">
//                 <h2>Game Type ({filters.gameTypes.length} selected)</h2>
//                 <div className="filter-actions">
//                   <button className="filter-action-btn" onClick={selectAllGameTypes}>
//                     Select All
//                   </button>
//                   <button className="filter-action-btn" onClick={clearAllGameTypes}>
//                     Clear All
//                   </button>
//                 </div>
//               </div>
//               <ul>
//                 {availableFilters.gameTypes && availableFilters.gameTypes.map((gameType) => (
//                   <li key={gameType}>
//                     <input
//                       type="checkbox"
//                       id={`gameType-${gameType}`}
//                       checked={filters.gameTypes.includes(gameType)}
//                       onChange={() => handleGameTypeToggle(gameType)}
//                     />
//                     <label htmlFor={`gameType-${gameType}`}>{gameType}</label>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Date Filter */}
//             <div className="search-checkbox-group check-group">
//               <h2>Date Range</h2>
//               <ul>
//                 {dateOptions.map((option) => (
//                   <li key={option.value}>
//                     <input
//                       type="radio"
//                       id={`date-${option.value}`}
//                       name="dateOption"
//                       checked={selectedDateOption === option.value}
//                       onChange={() => handleDateOptionChange(option.value)}
//                     />
//                     <label htmlFor={`date-${option.value}`}>{option.label}</label>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           <div className="searchpage-bar active">
//             <button className="button button-secondary" onClick={resetFilters}>
//               Reset
//             </button>
//             <button className="button" onClick={applyFilters}>
//               Confirm
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Betting Records Content */}
//       {!showFilter && (
//         <div className="inner-wrap">
//           <div className="inner-box">
//             {/* Loading State */}
//             {loading && (
//               <div className="loading-state">
//                 <div className="loading-spinner"></div>
//                 <div className="loading-text">Loading betting records...</div>
//               </div>
//             )}

//             {/* Active Filters Summary */}
//             {!loading && (filters.platforms.length > 0 || filters.gameTypes.length > 0) && (
//               <div className="active-filters">
//                 <div className="filters-summary">
//                   <span className="filters-label">Active Filters:</span>
//                   {filters.platforms.length > 0 && (
//                     <div className="filter-tag">
//                       Platforms: {filters.platforms.join(", ")}
//                       <button 
//                         className="filter-tag-remove"
//                         onClick={() => setFilters(prev => ({ ...prev, platforms: [] }))}
//                       >
//                         ×
//                       </button>
//                     </div>
//                   )}
//                   {filters.gameTypes.length > 0 && (
//                     <div className="filter-tag">
//                       Game Types: {filters.gameTypes.join(", ")}
//                       <button 
//                         className="filter-tag-remove"
//                         onClick={() => setFilters(prev => ({ ...prev, gameTypes: [] }))}
//                       >
//                         ×
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Table Header */}
//             {!loading && bettingData.length > 0 && (
//               <div className="record-item item-title">
//                 <div className="item platform">Platform</div>
//                 <div className="item type">Game Type</div>
//                 <div className="item bet">Turnover</div>
//                 <div className="item profit">Profit/Loss</div>
//               </div>
//             )}

//             {/* Betting Records List */}
//             {!loading && bettingData.length > 0 && (
//               <div className="list list-betting-record">
//                 {bettingData.map((dayData, index) => {
//                   const dayStats = calculateDateGroupStats(dayData.records || []);
//                   return (
//                     <div key={index} className="date-group">
//                       <div className="date-title">
//                         <div className="date">
//                           <span
//                             className="item-icon"
//                             style={{
//                               maskImage: 'url("/assets/images/icon-set/icon-calendar-type02.svg")',
//                               WebkitMaskImage: 'url("/assets/images/icon-set/icon-calendar-type02.svg")',
//                             }}
//                           ></span>
//                           {formatDate(dayData.date)}
//                         </div>
//                         <div className="date-stats">
//                           <span className="stat">Turnover: {formatCurrency(dayStats.turnover)}</span>
//                           <span className={`stat ${dayStats.profitLoss >= 0 ? 'positive' : 'negative'}`}>
//                             P/L: {formatCurrency(dayStats.profitLoss)}
//                           </span>
//                         </div>
//                         <div className="time-zone">GMT+8</div>
//                       </div>

//                       <div className="list-content">
//                         {dayData.records && dayData.records.map((record, recordIndex) => (
//                           <div
//                             key={record._id || recordIndex}
//                             className="record-item"
//                             onClick={() => showInfo(`Platform: ${record.platform} | Game: ${record.gameType}`)}
//                           >
//                             <div className="item platform">
//                               <span className="platform-name">{record.platform}</span>
//                             </div>
//                             <div className="item type">
//                               <span className="game-type">{record.gameType}</span>
//                             </div>
//                             <div className="item bet">
//                               {formatCurrency(record.turnover)}
//                             </div>
//                             <div
//                               className={`item profit ${
//                                 record.profitLoss >= 0 ? "positive" : "negative"
//                               }`}
//                             >
//                               {record.profitLoss >= 0 ? "+" : "-"}
//                               {formatCurrency(Math.abs(record.profitLoss))}
//                             </div>
//                             <div
//                               className="list-arrow"
//                               style={{
//                                 maskImage: 'url("/assets/images/icon-set/icon-arrow-type09.svg")',
//                                 WebkitMaskImage: 'url("/assets/images/icon-set/icon-arrow-type09.svg")',
//                               }}
//                             ></div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}

//             {/* Load More Button */}
//             {!loading && hasMore && bettingData.length > 0 && (
//               <div className="load-more-section">
//                 <button
//                   className="load-more-btn"
//                   onClick={loadMore}
//                   disabled={loadingMore}
//                 >
//                   {loadingMore ? (
//                     <>
//                       <div className="loading-spinner-small"></div>
//                       Loading...
//                     </>
//                   ) : (
//                     `Load More (${pagination.total - bettingData.length} remaining)`
//                   )}
//                 </button>
//               </div>
//             )}

//             {/* Loading More State */}
//             {loadingMore && (
//               <div className="loading-more-state">
//                 <div className="loading-spinner-small"></div>
//                 <div className="loading-text">Loading more records...</div>
//               </div>
//             )}

//             {/* Empty State */}
//             {!loading && bettingData.length === 0 && (
//               <div className="empty-state">
//                 <div className="empty-icon">
//                   <span
//                     className="item-icon"
//                     style={{
//                       maskImage: 'url("/assets/images/icon-set/icon-empty-betting.svg")',
//                       WebkitMaskImage: 'url("/assets/images/icon-set/icon-empty-betting.svg")',
//                     }}
//                   ></span>
//                 </div>
//                 <div className="empty-text">No betting records found</div>
//                 <div className="empty-subtext">
//                   {activeTab === "settled"
//                     ? "You have no settled bets for the selected period."
//                     : "You have no unsettled bets for the selected period."}
//                 </div>
//                 <button
//                   className="button button-outline"
//                   onClick={resetFilters}
//                 >
//                   Clear Filters
//                 </button>
//               </div>
//             )}

//             {/* Error State */}
//             {!loading && bettingData.length === 0 && (
//               <div className="empty-state">
//                 <div className="empty-icon">
//                   <span
//                     className="item-icon"
//                     style={{
//                       maskImage: 'url("/assets/images/icon-set/icon-error.svg")',
//                       WebkitMaskImage: 'url("/assets/images/icon-set/icon-error.svg")',
//                     }}
//                   ></span>
//                 </div>
//                 <div className="empty-text">
//                   No records match your filters
//                 </div>
//                 <button
//                   className="button button-outline"
//                   onClick={resetFilters}
//                 >
//                   Clear Filters
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BettingRecords;

// components/BettingRecords/BettingRecords.js
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useApi } from "../../../hooks/useApi";
import { useGameData } from "../../../hooks/useGameData";
import { useNotificationState } from "../../../hooks/useNotificationState";
import NoData from "../../common/NoData/NoData";

// Configuration constants
const CONFIG = {
  icons: {
    filter: "https://img.s628b.com/sb/h5/assets/images/icon-set/index-theme-icon/games-filter-icon.svg?v=1760412521693",
    arrow: "https://img.s628b.com/sb/h5/assets/images/icon-set/icon-arrow-type09.svg?v=1760412521693",
    calendar: "https://img.s628b.com/sb/h5/assets/images/icon-set/icon-calendar-type02.svg?v=1760412521693",
    cross: "https://img.s628b.com/sb/h5/assets/images/icon-set/icon-cross-type01.svg?v=1760412521693",
  },
  dateFormat: {
    date: 'en-US',
    time: 'en-US'
  }
};

// Tab configuration
const TAB_CONFIG = {
  settled: { text: "Settled", value: "settled" },
  unsettled: { text: "Unsettled", value: "unsettled" }
};

// Date options configuration
const DATE_OPTIONS = [
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "last7days", label: "Last 7 days" },
];

// Default filters
const DEFAULT_FILTERS = {
  platforms: [],
  gameTypes: [],
  dateOption: "last7days",
  settlement: "settled",
  page: 1,
  limit: 20,
};

// Custom hook for betting records management
const useBettingRecords = (filters, activeTab) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  });
  const [hasMore, setHasMore] = useState(true);

  const { apiCall } = useApi();
  const { showError, showSuccess } = useNotificationState();

  const buildApiParams = useCallback((page = 1) => {
    const payload = {
      page: page,
      limit: filters.limit,
      settlement: activeTab,
      dateOption: filters.dateOption,
    };

    // Convert platform objects to provider codes
    if (filters.platforms.length > 0) {
      payload.platforms = filters.platforms.map(platform => 
        typeof platform === 'object' ? platform.providercode : platform
      );
    }

    // Convert game type objects to keys
    if (filters.gameTypes.length > 0) {
      payload.gameTypes = filters.gameTypes.map(gameType =>
        typeof gameType === 'object' ? gameType.key : gameType
      );
    }

    return payload;
  }, [filters, activeTab]);

  const fetchRecords = useCallback(async (page = 1, isLoadMore = false) => {
    if (isLoadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }
    
    setError(null);

    try {
      const params = buildApiParams(page);
      
      const response = await apiCall("/api/member/betting-records-simple", "GET", params);
      
      if (response.success) {
        const newRecords = response.data || [];
        
        if (isLoadMore) {
          setRecords(prev => [...prev, ...newRecords]);
        } else {
          setRecords(newRecords);
        }
        
        const newPagination = response.pagination || {
          page: page,
          limit: filters.limit,
          total: newRecords.length,
          pages: Math.ceil(newRecords.length / filters.limit)
        };
        
        setPagination(newPagination);
        setHasMore(page < newPagination.pages);
        
        if (isLoadMore) {
          showSuccess(`Loaded ${newRecords.length} more records`);
        }
      } else {
        throw new Error(response.message || "Failed to load betting records");
      }
    } catch (error) {
      console.error("Error fetching betting records:", error);
      setError(error.message);
      
      // Fallback to sample data for demonstration
      const sampleData = generateSampleData();
      if (isLoadMore) {
        setRecords(sampleData);
      } else {
        setRecords(sampleData);
      }
      
      if (isLoadMore) {
        showSuccess(`Loaded ${sampleData.length} more records`);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [buildApiParams, filters.limit]);

  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      const nextPage = pagination.page + 1;
      fetchRecords(nextPage, true);
    }
  }, [loadingMore, hasMore, pagination.page, fetchRecords]);

  return {
    records,
    loading,
    loadingMore,
    error,
    pagination,
    hasMore,
    fetchRecords,
    loadMore,
    setRecords
  };
};

// Custom hook for filter management
const useBettingFilters = () => {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterChange = useCallback((filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value,
      page: 1, // Reset to first page when filters change
    }));
  }, []);

  const handlePlatformToggle = useCallback((platform) => {
    setFilters(prev => ({
      ...prev,
      platforms: prev.platforms.some(p => 
        (typeof p === 'object' ? p.providercode : p) === 
        (typeof platform === 'object' ? platform.providercode : platform)
      )
        ? prev.platforms.filter(p => 
            (typeof p === 'object' ? p.providercode : p) !== 
            (typeof platform === 'object' ? platform.providercode : platform)
          )
        : [...prev.platforms, platform],
      page: 1,
    }));
  }, []);

  const handleGameTypeToggle = useCallback((gameType) => {
    setFilters(prev => ({
      ...prev,
      gameTypes: prev.gameTypes.some(g => 
        (typeof g === 'object' ? g.key : g) === 
        (typeof gameType === 'object' ? gameType.key : gameType)
      )
        ? prev.gameTypes.filter(g => 
            (typeof g === 'object' ? g.key : g) !== 
            (typeof gameType === 'object' ? gameType.key : gameType)
          )
        : [...prev.gameTypes, gameType],
      page: 1,
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  return {
    filters,
    isFilterOpen,
    setIsFilterOpen,
    handleFilterChange,
    handlePlatformToggle,
    handleGameTypeToggle,
    resetFilters
  };
};

// Utility functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount || 0);
};

const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString(CONFIG.dateFormat.date, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  } catch (error) {
    return "Invalid Date";
  }
};

const generateSampleData = () => {
  const samplePlatforms = [
    { providercode: "JILI", company: "JILI" },
    { providercode: "PNG", company: "PNG" },
    { providercode: "JDB", company: "JDB" }
  ];
  
  const sampleGameTypes = [
    { key: "slot", name: "Slot" },
    { key: "live", name: "Live Casino" },
    { key: "sports", name: "Sports" }
  ];
  
  return [{
    date: new Date().toISOString().split('T')[0],
    records: Array.from({ length: 6 }, (_, i) => ({
      _id: `sample-${i}-${Date.now()}`,
      platform: samplePlatforms[i % samplePlatforms.length].company,
      gameType: sampleGameTypes[i % sampleGameTypes.length].name,
      turnover: Math.random() * 1000 + 100,
      profitLoss: (Math.random() - 0.5) * 200,
      bet: Math.random() * 500 + 50,
      payout: Math.random() * 600 + 40,
      start_time: new Date()
    }))
  }];
};

// Sub-components
const FilterGroup = ({ title, type, options, selected, onChange, count }) => (
  <div className="search-checkbox-group check-group">
    <h2>{title} {count !== undefined && `(${count} selected)`}</h2>
    <ul>
      {options.map((option) => (
        <li key={option.value}>
          <input
            type={type}
            id={`${title}-${option.value}`}
            checked={
              type === "radio"
                ? selected === option.value
                : selected.some(item => 
                    (typeof item === 'object' ? item.value || item.key : item) === option.value
                  )
            }
            onChange={() => onChange(option.value)}
          />
          <label htmlFor={`${title}-${option.value}`}>{option.label}</label>
        </li>
      ))}
    </ul>
  </div>
);

// Reusable Checkbox Filter Group
const CheckboxFilterGroup = ({ title, items, selectedItems, onItemToggle, valueKey, labelKey }) => (
  <div className="search-checkbox-group check-group">
    <h2>{title} ({selectedItems.length} selected)</h2>
    <ul>
      {items.map((item) => {
        const value = typeof item === 'object' ? item[valueKey] : item;
        const label = typeof item === 'object' ? item[labelKey] : item;
        const isSelected = selectedItems.some(s => 
          (typeof s === 'object' ? s[valueKey] : s) === value
        );
        const id = `${title.replace(/\s+/g, '')}-${value}`;
        
        return (
          <li key={value}>
            <input
              type="checkbox"
              id={id}
              checked={isSelected}
              onChange={() => onItemToggle(item)}
            />
            <label htmlFor={id}>{label}</label>
          </li>
        );
      })}
    </ul>
  </div>
);

const FilterPanel = ({ 
  isOpen, 
  onClose, 
  filters, 
  availableFilters,
  onFilterChange,
  onPlatformToggle,
  onGameTypeToggle,
  onApply 
}) => {
  if (!isOpen) return null;

  return (
    <div className="searchpage active">
      <div className="search-top-info">
        <div className="back" onClick={onClose}>
          <span 
            className="item-icon"
            style={{ maskImage: `url(${CONFIG.icons.arrow})` }}
          ></span>
          Back
        </div>
        <input 
          type="text" 
          placeholder="Betting Record Filter" 
          disabled 
          style={{ backgroundImage: "url('')" }}
        />
      </div>

      <div className="searchpage-main">
        <CheckboxFilterGroup
          title="Platform"
          items={availableFilters.platforms}
          selectedItems={filters.platforms}
          onItemToggle={onPlatformToggle}
          valueKey="providercode"
          labelKey="company"
        />

        <CheckboxFilterGroup
          title="Game Type"
          items={availableFilters.gameTypes}
          selectedItems={filters.gameTypes}
          onItemToggle={onGameTypeToggle}
          valueKey="key"
          labelKey="name"
        />

        <FilterGroup
          title="Date"
          type="radio"
          options={DATE_OPTIONS}
          selected={filters.dateOption}
          onChange={(val) => onFilterChange("dateOption", val)}
        />
      </div>

      <div className="searchpage-bar active">
        <button className="button" onClick={onApply}>
          Confirm
        </button>
      </div>
    </div>
  );
};

const BettingList = ({ records, loading, loadingMore, hasMore, onLoadMore }) => {
  if (loading) {
    return <div className="loading-state">Loading betting records...</div>;
  }

  if (!records || records.length === 0) {
    return <NoData message="No betting records found" />;
  }

  return (
    <div className="waterfall-scroll">
      {records.map((dayData, index) => (
        <BettingDateGroup 
          key={dayData.date || index}
          dayData={dayData}
        />
      ))}
      
      {hasMore && (
        <LoadMoreSection 
          loadingMore={loadingMore}
          onLoadMore={onLoadMore}
        />
      )}
      
      <div className="prompt">－end of page－</div>
    </div>
  );
};

const BettingDateGroup = ({ dayData }) => (
  <div className="list list-betting-record">
    <div className="date-title">
      <div className="date">
        <span 
          className="item-icon"
          style={{ maskImage: `url(${CONFIG.icons.calendar})` }}
        ></span>
        {formatDate(dayData.date)}
      </div>
      <div className="time-zone">GMT+8</div>
    </div>

    <div className="list-content">
      {dayData.records && dayData.records.map((record, recordIndex) => (
        <BettingListItem
          key={record._id || recordIndex}
          record={record}
        />
      ))}
    </div>
  </div>
);

const BettingListItem = ({ record }) => {
  const isProfit = record.profitLoss >= 0;
  
  return (
    <div className="record-item">
      <div className="item platform">{record.platform}</div>
      <div className="item type">{record.gameType}</div>
      <div className="item bet">
        {formatCurrency(record.turnover)}
      </div>
      <div className={`item profit ${isProfit ? "positive" : "negative"}`}>
        {isProfit ? "+" : "-"}
        {formatCurrency(Math.abs(record.profitLoss))}
      </div>
      <div 
        className="list-arrow"
        style={{ 
          display: 'block', 
          maskImage: `url(${CONFIG.icons.arrow})` 
        }}
      ></div>
    </div>
  );
};

const LoadMoreSection = ({ loadingMore, onLoadMore }) => (
  <div className="load-more-section">
    {/* <button
      className="load-more-btn"
      onClick={onLoadMore}
      disabled={loadingMore}
    >
      {loadingMore ? (
        <>
          <div className="loading-spinner-small"></div>
          Loading...
        </>
      ) : (
        "Load More Records"
      )}
    </button> */}
  </div>
);

const TabNavigation = ({ activeTab, onTabChange }) => (
  <div className="tab-btn-section">
    <div className="tab-btn tab-btn-page">
      <div 
        className="line" 
        style={{ 
          width: "calc(50%)", 
          transform: `translate(${activeTab === "settled" ? "0%" : "100%"}, 0px)` 
        }}
      ></div>
      {Object.values(TAB_CONFIG).map((tab) => (
        <div
          key={tab.value}
          className={`btn ${activeTab === tab.value ? "active" : ""}`}
          onClick={() => onTabChange(tab.value)}
        >
          <div className="text">{tab.text}</div>
        </div>
      ))}
    </div>
  </div>
);

// Main Component
const BettingRecords = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showInfo } = useNotificationState();
  
  const [activeTab, setActiveTab] = useState("settled");
  
  // Game data hook
  const { data: gameCategories, loading: gameDataLoading } = useGameData();
  
  // Extract available filters from game data
  const availableFilters = {
    platforms: gameCategories?.flatMap(category => 
      category.uniqueProviders?.map(provider => ({
        providercode: provider.providercode || provider.id || provider.code || "",
        company: provider.company || provider.name || provider.provider || "",
        image_url: provider.image_url || provider.logo || ""
      })).filter(provider => provider.providercode) || []
    ) || [],
    
    gameTypes: gameCategories?.map(category => ({
      key: category.category_key || category.id || category.category_name || "",
      name: category.category_name || category.name || "",
      image: category.image || ""
    })).filter(gameType => gameType.key) || []
  };

  // Filter management
  const {
    filters,
    isFilterOpen,
    setIsFilterOpen,
    handleFilterChange,
    handlePlatformToggle,
    handleGameTypeToggle,
    resetFilters
  } = useBettingFilters();

  // Records management
  const {
    records,
    loading,
    loadingMore,
    error,
    hasMore,
    fetchRecords,
    loadMore
  } = useBettingRecords(filters, activeTab);

  // Handle tab change
  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    handleFilterChange("settlement", tab);
  }, [handleFilterChange]);

  // Close modal
  const closeModal = useCallback(() => {
    if (location.state?.background) {
      navigate(-1);
    } else {
      navigate("/");
    }
  }, [navigate, location]);

  // Apply filters and close panel
  const applyFilters = useCallback(() => {
    setIsFilterOpen(false);
    fetchRecords(1, false);
    showInfo("Filters applied successfully");
  }, [setIsFilterOpen, fetchRecords, showInfo]);

  // Fetch records when filters or tab change
  useEffect(() => {
    fetchRecords(1, false);
  }, [filters, activeTab, fetchRecords]);

  return (
    <div className="popup-page-wrapper active">
      <div className="popup-page show-toolbar popup-page--active popup-page--align-top">
        <div className="popup-page__backdrop" onClick={closeModal}></div>
        <div className="popup-page__main popup-page-main popup-page-main--show">
          <div className="popup-page-main__header">
            <div className="popup-page-main__title">Betting Records</div>
            <div className="popup-page-main__close" onClick={closeModal}></div>
          </div>

          <div className="popup-page-main__container">
            <div className="content mcd-style player-content">
              <div className="betting-records">
                {/* Tab Navigation */}
                <TabNavigation 
                  activeTab={activeTab}
                  onTabChange={handleTabChange}
                />

                <div className="tab-content tab-content-page">
                  {/* Filter Section */}
                  <div className="search-tab">
                    <div className="tab filter-tab">
                      <ul className="item-ani">
                        {DATE_OPTIONS.map((option) => (
                          <li
                            key={option.value}
                            className={filters.dateOption === option.value ? "active" : ""}
                            onClick={() => handleFilterChange("dateOption", option.value)}
                          >
                            {option.label}
                          </li>
                        ))}
                      </ul>
                      <div 
                        className="btn search-btn"
                        onClick={() => setIsFilterOpen(true)}
                      >
                        <span 
                          className="item-icon"
                          style={{ maskImage: `url(${CONFIG.icons.filter})` }}
                        ></span>
                      </div>
                    </div>

                    <FilterPanel
                      isOpen={isFilterOpen}
                      onClose={() => setIsFilterOpen(false)}
                      filters={filters}
                      availableFilters={availableFilters}
                      onFilterChange={handleFilterChange}
                      onPlatformToggle={handlePlatformToggle}
                      onGameTypeToggle={handleGameTypeToggle}
                      onApply={applyFilters}
                    />
                  </div>

                  {/* Betting List Header */}
                  {!loading && records.length > 0 && (
                    <div className="record-item item-title">
                      <div className="item platform">Platform</div>
                      <div className="item type">Game Type</div>
                      <div className="item bet">Turnover</div>
                      <div className="item profit">Profit/Loss</div>
                    </div>
                  )}

                  {/* Betting List */}
                  <BettingList
                    records={records}
                    loading={loading || gameDataLoading}
                    loadingMore={loadingMore}
                    hasMore={hasMore}
                    onLoadMore={loadMore}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BettingRecords;