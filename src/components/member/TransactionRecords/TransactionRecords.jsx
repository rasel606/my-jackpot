import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import NoData from "../../common/NoData/NoData";

// Configuration constants - can be moved to separate config file
const CONFIG = {
  icons: {
    filter: "https://img.s628b.com/sb/h5/assets/images/icon-set/index-theme-icon/games-filter-icon.svg?v=1760412521693",
    arrow: "https://img.s628b.com/sb/h5/assets/images/icon-set/icon-arrow-type09.svg?v=1760412521693",
    calendar: "https://img.s628b.com/sb/h5/assets/images/icon-set/icon-calendar-type02.svg?v=1760412521693",
    cross: "https://img.s628b.com/sb/h5/assets/images/icon-set/icon-cross-type01.svg?v=1760412521693",
    timeline: "https://img.s628b.com/sb/h5/assets/images/icon-set/icon-timeline.svg?v=1760412521693&source=mcdsrc",
    table: "https://img.s628b.com/sb/h5/assets/images/icon-set/icon-table.svg?v=1760412521693&source=mcdsrc",
    pending: "https://img.s628b.com/sb/h5/assets/images/icon-set/icon-pending-type05.svg",
    check: "https://img.s628b.com/sb/h5/assets/images/icon-set/icon-check-type06.svg",
    reject: "https://img.s628b.com/sb/h5/assets/images/icon-set/icon-cross-type07.svg"
  },
  images: {
    noData: "https://img.s628b.com/sb/h5/assets/images/no-data.png?v=1760412521693&source=mcdsrc",
    paymentBase: "https://img.s628b.com/sb/h5/assets/images/payment/"
  },
  dateFormat: {
    date: 'en-GB',
    time: 'en-GB'
  }
};

// Status configuration
const STATUS_CONFIG = {
  0: { text: "Processing", class: "pending", icon: CONFIG.icons.pending },
  1: { text: "Approved", class: "positive", icon: CONFIG.icons.check },
  2: { text: "Rejected", class: "negative", icon: CONFIG.icons.reject }
};

// Transaction type configuration
const TRANSACTION_TYPE_CONFIG = {
  0: "Deposit",
  1: "Withdrawal", 
  2: "Adjustment"
};

// Filter options configuration
const FILTER_OPTIONS = {
  status: [
    { label: "Processing", value: 0 },
    { label: "Approved", value: 1 },
    { label: "Rejected", value: 2 },
  ],
  paymentType: [
    { label: "Deposit", value: 0 },
    { label: "Withdrawal", value: 1 },
    { label: "Adjustment", value: 2 },
  ],
  date: [
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "Last 7 Days", value: "last7days" },
  ]
};

// Default filters
const DEFAULT_FILTERS = {
  status: [0, 1, 2],
  paymentType: [0, 1, 2],
  date: "last7days",
};

// Custom hook for transaction management
const useTransactions = (userId) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTransactions = useCallback(async (filters = {}) => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Replace with your actual API call
      // const response = await searchTransactionsbyUserId({ userId, filters });
      
      // Mock data for demonstration - remove this in production
      const mockData = generateMockTransactions(filters);
      setTransactions(mockData);
      
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError(err.message);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  return {
    transactions,
    loading,
    error,
    fetchTransactions,
    setTransactions
  };
};

// Custom hook for filter management
const useTransactionFilters = () => {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterChange = useCallback((filterType, value) => {
    setFilters((prev) => {
      if (filterType === "date") {
        return { ...prev, date: value };
      }
      
      return {
        ...prev,
        [filterType]: prev[filterType].includes(value)
          ? prev[filterType].filter((v) => v !== value)
          : [...prev[filterType], value],
      };
    });
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  return {
    filters,
    isFilterOpen,
    setIsFilterOpen,
    handleFilterChange,
    resetFilters
  };
};

// Utility functions
const formatDate = (dateString, options = {}) => {
  const date = new Date(dateString);
  const formatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    ...options
  };
  
  return date.toLocaleDateString(CONFIG.dateFormat.date, formatOptions).replace(/\//g, ' : ');
};

const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString(CONFIG.dateFormat.time, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

const getStatusInfo = (status) => {
  return STATUS_CONFIG[status] || { text: "Unknown", class: "", icon: CONFIG.icons.pending };
};

const getTransactionType = (type) => {
  return TRANSACTION_TYPE_CONFIG[type] || "Unknown";
};

const generateMockTransactions = (filters) => {
  // This is mock data - remove in production
  return [
    {
      date: formatDate(new Date()),
      transactions: [
        {
          _id: "txn_001",
          type: 0,
          base_amount: "100.00",
          status: 1,
          datetime: new Date().toISOString(),
          updatetime: new Date().toISOString(),
          gateway_name: "Bank Transfer",
          currency: "$",
          transactionID: "REF123456"
        },
        {
          _id: "txn_002", 
          type: 1,
          base_amount: "50.00",
          status: 0,
          datetime: new Date().toISOString(),
          gateway_name: "Credit Card",
          currency: "$",
          transactionID: "REF123457"
        }
      ]
    }
  ];
};

// Sub-components
const FilterGroup = ({ title, type, options, selected, onChange }) => (
  <div className="search-checkbox-group check-group">
    <h2>{title}</h2>
    <ul>
      {options.map((option) => (
        <li key={option.value}>
          <input
            type={type}
            id={`${title}-${option.value}`}
            checked={
              type === "radio"
                ? selected === option.value
                : selected.includes(option.value)
            }
            onChange={() => onChange(option.value)}
          />
          <label htmlFor={`${title}-${option.value}`}>{option.label}</label>
        </li>
      ))}
    </ul>
  </div>
);



const TransactionList = ({ transactions, loading, onTransactionClick }) => {
  if (loading) {
    return <div className="loading-state">Loading transactions...</div>;
  }

  if (!transactions || transactions.length === 0) {
    return <NoData />;
  }

  
  return (
    <div className="waterfall-scroll">
      {transactions.map((tnxDate, index) => (
        <TransactionDateGroup 
          key={tnxDate.date || index}
          tnxDate={tnxDate}
          onTransactionClick={onTransactionClick}
        />
      ))}
      <div className="prompt">－end of page－</div>
    </div>
  );
};

const TransactionDateGroup = ({ tnxDate, onTransactionClick }) => (
  <div className="list list-betting-record">
    <div className="date-title">
      <div className="date">
        <span 
          className="item-icon"
          style={{ maskImage: `url(${CONFIG.icons.calendar})` }}
        ></span>
        {tnxDate.date}
      </div>
      <div className="time-zone">GMT+6</div>
    </div>

    <div className="list-content">
      {tnxDate.transactions.map((tx, txIndex) => (
        <TransactionListItem
          key={tx._id || txIndex}
          transaction={tx}
          onClick={() => onTransactionClick(tx)}
        />
      ))}
    </div>
  </div>
);

const TransactionListItem = ({ transaction, onClick }) => {
  const statusInfo = getStatusInfo(transaction.status);
  
  return (
    <div
      className="record-item transaction-record-list no-detail-info"
      onClick={onClick}
    >
      <div className="item type">
        {getTransactionType(transaction.type)}
      </div>
      <div className="item amount">
        <i>{transaction.base_amount}</i>
      </div>
      <div className={`item status ${statusInfo.class}`}>
        <div className="tags">
          {statusInfo.text}
        </div>
      </div>
      <div className="item time">
        {formatTime(transaction.datetime)}
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

const FilterPanel = ({ isOpen, onClose, filters, onFilterChange }) => {
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
          placeholder="Transaction Record Filter" 
          disabled 
          style={{ backgroundImage: "url('')" }}
        />
      </div>

      <div className="searchpage-main">
        <FilterGroup
          title="Status"
          type="checkbox"
          options={FILTER_OPTIONS.status}
          selected={filters.status}
          onChange={(val) => onFilterChange("status", val)}
        />

        <FilterGroup
          title="Payment Type"
          type="checkbox"
          options={FILTER_OPTIONS.paymentType}
          selected={filters.paymentType}
          onChange={(val) => onFilterChange("paymentType", val)}
        />

        <FilterGroup
          title="Date"
          type="radio"
          options={FILTER_OPTIONS.date}
          selected={filters.date}
          onChange={(val) => onFilterChange("date", val)}
        />
      </div>

      <div className="searchpage-bar active">
        <button 
          className="button" 
          onClick={onClose}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

const TransactionDetails = ({ transaction, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("timeline");
  
  if (!isOpen || !transaction) return null;

  const statusInfo = getStatusInfo(transaction.status);
  const paymentImageUrl = `${CONFIG.images.paymentBase}${transaction.gateway_name?.toLowerCase() || 'default'}.png?v=1760412521693&source=mcdsrc`;

  return (
    <div className="pop-transaction-records-details active">
      <div className="pop-bg" onClick={onClose}></div>
      
      <div className="details-content">
        <TransactionHeader 
          transaction={transaction}
          paymentImageUrl={paymentImageUrl}
          onClose={onClose}
        />
        
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        <TabContent 
          activeTab={activeTab}
          transaction={transaction}
          statusInfo={statusInfo}
        />

        <div className="member-content">
          <div id="txn-submitMissingTrx" className="button">
            <a>Submit Missing Transaction</a>
          </div>
        </div>
      </div>
    </div>
  );
};

const TransactionHeader = ({ transaction, paymentImageUrl, onClose }) => (
  <>
    <div className="bank-name">
      <img
        src={paymentImageUrl}
        alt={transaction.gateway_name || 'payment'}
        onError={(e) => {
          e.target.src = `${CONFIG.images.paymentBase}default.png?v=1760412521693&source=mcdsrc`;
        }}
      />
      <span>{transaction.gateway_name || 'Payment'}</span>
    </div>

    <a 
      className="btn-closed" 
      onClick={onClose}
      style={{ maskImage: `url(${CONFIG.icons.cross})` }}
    ></a>

    <div className="header">Transaction Record Details</div>
  </>
);

const TabNavigation = ({ activeTab, onTabChange }) => (
  <div className="tab-button-not-link">
    <div className="tab-btn-section tab-btn-wrap">
      <div className="tab-btn tab-btn-bar">
        <div 
          className="line" 
          style={{ 
            width: '50%', 
            transform: `translate(${activeTab === 'timeline' ? '0%' : '100%'}, 0px)` 
          }}
        ></div>
        
        <div 
          className={`btn ${activeTab === 'timeline' ? 'current' : ''}`}
          onClick={() => onTabChange('timeline')}
        >
          <img
            className="icon"
            src={CONFIG.icons.timeline}
            alt="icon-timeline"
            loading="lazy"
          />
        </div>

        <div 
          className={`btn ${activeTab === 'details' ? 'current' : ''}`}
          onClick={() => onTabChange('details')}
        >
          <img
            className="icon"
            src={CONFIG.icons.table}
            alt="icon-table"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </div>
);

const TabContent = ({ activeTab, transaction, statusInfo }) => (
  <div className={`content pop-content ${statusInfo.class}`}>
    <div className="tab-content tab-content-page">
      <div 
        className="inner-wrap"
        style={{
          transform: `translate(${activeTab === 'timeline' ? '0%' : '-100%'}, 0px)`
        }}
      >
        <TimelineTab 
          active={activeTab === 'timeline'}
          transaction={transaction}
          statusInfo={statusInfo}
        />
        
        <DetailsTab 
          active={activeTab === 'details'}
          transaction={transaction}
          statusInfo={statusInfo}
        />
      </div>
    </div>
  </div>
);

const TimelineTab = ({ active, transaction, statusInfo }) => (
  <div 
    className={`inner-box ${active ? 'active' : ''}`}
    style={{ height: 'auto' }}
    data-tab-current={active ? 'current' : ''}
  >
    <div className="transaction-details-wrap">
      <div className="title">
        <h3>Transaction Progress</h3>
        <div className="tags">
          {statusInfo.text}
        </div>
      </div>

      <div className="timeline-box">
        <TimelineEvents transaction={transaction} statusInfo={statusInfo} />
      </div>
    </div>
  </div>
);

const TimelineEvents = ({ transaction, statusInfo }) => {
  const events = [
    {
      date: transaction.datetime,
      status: transaction.status,
      text: `Transaction ${statusInfo.text.toLowerCase()}`,
      time: transaction.updatetime || transaction.datetime,
      animationDelay: "0.2s"
    },
    {
      date: transaction.datetime, 
      status: transaction.status,
      text: "Transaction processed",
      time: transaction.datetime,
      animationDelay: "0.3s"
    },
    {
      date: transaction.datetime,
      status: transaction.status,
      text: "Transaction initiated", 
      time: transaction.datetime,
      animationDelay: "0.4s"
    }
  ];

  return (
    <>
      {events.map((event, index) => (
        <React.Fragment key={index}>
          <div className="date">
            {formatDate(event.date).replace(/ : /g, '/')}
          </div>

          <div className={`timeline-block ${index === 0 && transaction.status === 1 ? 'current' : ''}`}>
            <div className={`point ${index === 0 && transaction.status === 1 ? 'bounce' : ''}`}>
              <span 
                className="item-icon"
                style={{ maskImage: `url(${statusInfo.icon})` }}
              ></span>
            </div>

            <div 
              className="content"
              style={{ animation: `1s ease ${event.animationDelay} 1 normal none running slide` }}
            >
              <div className="text">{event.text}</div>
              <div className="time">{formatTime(event.time)}</div>
            </div>
          </div>
        </React.Fragment>
      ))}
    </>
  );
};

const DetailsTab = ({ active, transaction, statusInfo }) => (
  <div 
    className={`inner-box ${active ? 'active' : ''}`}
    style={{ height: 'auto' }}
    data-tab-current={active ? 'current' : ''}
  >
    <div className="transaction-details-wrap">
      <div className="title">
        <h3>Transaction Record Details</h3>
        <div className="tags">
          {statusInfo.text}
        </div>
      </div>

      <div className="details-box">
        <DetailItem label="No." value={transaction._id} />
        <DetailItem label="Type" value={`${getTransactionType(transaction.type)} Payment Gateway`} />
        <DetailItem label="Payment Method" value={transaction.gateway_name} />
        <DetailItem label="Payment Type" value={`${transaction.gateway_name} Payment`} />
        <DetailItem label="Bank Name" value={transaction.gateway_name?.toUpperCase()} />
        <DetailItem 
          label="Amount" 
          value={<i>{transaction.currency}{transaction.base_amount}</i>} 
        />
        
        {transaction.transactionID && (
          <DetailItem label="Reference No." value={transaction.transactionID} />
        )}
      </div>
    </div>
  </div>
);

const DetailItem = ({ label, value }) => (
  <div className="info">
    <div className="name">{label}</div>
    <div className="value">{value}</div>
  </div>
);

// Main Component
const TransactionRecords = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = useAuth();
  
  const {
    transactions,
    loading,
    fetchTransactions
  } = useTransactions(userId);
  
  const {
    filters,
    isFilterOpen,
    setIsFilterOpen,
    handleFilterChange
  } = useTransactionFilters();
  
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Fetch transactions when filters or userId change
  useEffect(() => {
    fetchTransactions(filters);
  }, [filters, userId, fetchTransactions]);

  const handleTransactionClick = useCallback((transaction) => {
    setSelectedTransaction(transaction);
    setShowDetails(true);
  }, []);

  const closeDetailView = useCallback(() => {
    setShowDetails(false);
    setSelectedTransaction(null);
  }, []);

  const closeModal = useCallback(() => {
    if (location.state?.background) {
      navigate(-1);
    } else {
      navigate("/");
    }
  }, [navigate, location]);

  return (
    <div className="popup-page-wrapper active">
      <div className="popup-page show-toolbar popup-page--active popup-page--align-top">
        <div className="popup-page__backdrop" onClick={closeModal}></div>
        <div className="popup-page__main popup-page-main popup-page-main--show">
          <div className="popup-page-main__header">
            <div className="popup-page-main__title">Transaction Records</div>
            <div className="popup-page-main__close" onClick={closeModal}></div>
          </div>

          <div className="popup-page-main__container">
            <div className="content mcd-style player-content">
              <div className="transaction-records">
                {/* Filter Section */}
                <div className="search-tab">
                  <div className="tab filter-tab">
                    <ul className="item-ani">
                      <li className="active">{filters.date}</li>
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
                    onFilterChange={handleFilterChange}
                  />
                </div>

                {/* Transaction List Header */}
                <div className="record-item item-title transaction-record-list">
                  <div className="item type">Type</div>
                  <div className="item amount">Amount</div>
                  <div className="item status">Status</div>
                  <div className="item time">Txn Date</div>
                </div>

                {/* Transaction List */}
                <TransactionList
                  transactions={transactions}
                  loading={loading}
                  onTransactionClick={handleTransactionClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Details Popup */}
      <TransactionDetails
        transaction={selectedTransaction}
        isOpen={showDetails}
        onClose={closeDetailView}
      />
    </div>
  );
};

export default TransactionRecords;