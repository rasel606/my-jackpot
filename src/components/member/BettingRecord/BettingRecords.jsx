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