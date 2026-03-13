// components/pages/PromotionPage.js
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { usePopup } from "../../layouts/PopupManager";
import PromotionInfo from "./PromotionInfo";
import { useApi } from "../../../hooks/useApi";
import { useApp } from "../../../contexts/AppContext";
import promotionsService from "../../../services/promotionService";

// Constants for better maintainability
const API_ENDPOINTS = {
  GAME_CATEGORIES: "https://api.png71.live/api/games/New-table-Games-with-Providers",
};

const BONUS_TYPES = {
  deposit: { label: 'Deposit Bonus', color: '#4CAF50' },
  dailyRebate: { label: 'Daily Rebate', color: '#2196F3' },
  weeklyBonus: { label: 'Weekly Bonus', color: '#9C27B0' },
  vip: { label: 'VIP Bonus', color: '#FF9800' },
  referral: { label: 'Referral Bonus', color: '#E91E63' },
  referralRebate: { label: 'Referral Rebate', color: '#795548' },
  normalDeposit: { label: 'Normal Deposit', color: '#607D8B' },
  signup: { label: 'Signup Bonus', color: '#00BCD4' },
  birthday: { label: 'Birthday Bonus', color: '#FF5722' },
  other: { label: 'Other Bonus', color: '#757575' }
};

const DEFAULT_CATEGORIES = [
  { key: 'all', label: 'ALL' },
  { key: 'deposit', label: 'Deposit' },
  { key: 'dailyRebate', label: 'Daily Rebate' },
  { key: 'weeklyBonus', label: 'Weekly' },
  { key: 'vip', label: 'VIP' },
  { key: 'referral', label: 'Referral' },
  { key: 'signup', label: 'Signup' },
  { key: 'birthday', label: 'Birthday' }
];

const PromotionPage = ({ showError, showSuccess, showWarning, showInfo }) => {
  const navigate = useNavigate();
  const { openPopup } = usePopup();
  const [activeCategory, setActiveCategory] = useState("new-promotions");
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [promotions, setPromotions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { apiCall } = useApi();
  const { loading,setLoadingState } = useApp();

  // Fetch categories from API

const GetPromotionsData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await promotionsService.GetPromotions();
      console.log("Promotions Data:", response);
      setPromotions(response.data );
    } catch (error) {
      console.error("Error fetching promotions:", error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    GetPromotionsData();
  }, []);


  // Fetch promotions data
  // useEffect(() => {
  //   const fetchPromotions = async () => {
  //     try {
  //       setIsLoading(true);
  //       // Replace with actual API call
  //       const mockPromotions = await GetPromotionsData();
  //       console.log("Promotions Data:", mockPromotions);
  //       setPromotions(mockPromotions);
  //     } catch (err) {
  //       console.error("Error fetching promotions:", err);
  //       showError?.("Failed to load promotions. Please try again later.");
  //       setPromotions([]);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchPromotions();
  // }, [showError]);

  const closeModal = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleSearchToggle = useCallback(() => {
    setSearchMode(prev => !prev);
    if (searchMode) {
      setSearchQuery("");
    }
  }, [searchMode]);

  const handleSearchConfirm = useCallback(() => {
    console.log("Search query:", searchQuery);
    setSearchMode(false);
  }, [searchQuery]);

  const handleCategoryChange = useCallback((category) => {
    setActiveCategory(category);
  }, []);

  // Memoized filtered promotions for better performance
  const filteredPromotions = useMemo(() => {
    return promotions.filter((promo) => {
      const matchesCategory = 
        activeCategory === "new-promotions" || 
        promo.bonusType === activeCategory.categories.find(cat => cat.key === activeCategory).category_name;
      
      const matchesSearch =
        searchQuery === "" ||
        promo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        promo.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [promotions, activeCategory, searchQuery]);

  const handlePromoAction = useCallback(
    (promotion) => {
      openPopup(
        <PromotionInfo
          promotion={promotion}
          showSuccess={showSuccess}
          onClose={() => {}}
        />,
        {
          contentClass: "promotionPop",
          size: "large",
        }
      );
    },
    [openPopup, showSuccess]
  );

  // const handlePromoAction = useCallback(
  //   (promotion, actionType) => {
  //     if (actionType === "apply") {
  //       showSuccess?.(`Applied for: ${promotion.title}`);
  //     } else if (actionType === "detail") {
  //       handlePromoDetail(promotion);
  //     }
  //   },
  //   [handlePromoDetail, showSuccess]
  // );

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="content-main promotion ng-tns-c1259012856-6 ng-star-inserted">
      <div className="content-box ng-tns-c1259012856-6">
        <div className="promotion ng-tns-c1259012856-6">
          <SearchTab
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            searchMode={searchMode}
            onSearchToggle={handleSearchToggle}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearchConfirm={handleSearchConfirm}
          />

          <PromoCodeForm 
            showSuccess={showSuccess} 
            showError={showError} 
          />

          <WaterfallScroll
            promotions={filteredPromotions}
            onPromoAction={handlePromoAction}
          />
        </div>
      </div>
    </div>
  );
};

// Loading State Component
const LoadingState = () => (
  <div className="content-main promotion ng-tns-c1259012856-6 ng-star-inserted">
    <div className="content-box ng-tns-c1259012856-6">
      <div className="promotion ng-tns-c1259012856-6">
        <div className="loading-fullscreen">
          <div className="loading-spinner"></div>
          <p>Loading promotions...</p>
        </div>
      </div>
    </div>
  </div>
);

// Search Tab Component
const SearchTab = ({
  categories,
  activeCategory,
  onCategoryChange,
  searchMode,
  onSearchToggle,
  searchQuery,
  onSearchChange,
  onSearchConfirm,
}) => {
  if (searchMode) {
    return (
      <div className="searchpage ng-star-inserted">
        <div className="search-top-info">
          <div className="back" onClick={onSearchToggle} role="button" tabIndex={0}>
            <span
              className="item-icon"
              style={{
                maskImage: 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-arrow-type09.svg?v=1761636564965")',
              }}
            ></span>
            Back
          </div>
          <div
            className="icon-search ng-star-inserted"
            style={{
              maskImage: 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-search-type02.svg?v=1761636564965")',
            }}
          ></div>
          <input
            type="text"
            className="ng-untouched ng-pristine ng-valid"
            placeholder="Promotion Filter"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            autoFocus
          />
        </div>
        <div className="searchpage-main">
          {/* Search results would go here */}
        </div>
        <div className="searchpage-bar">
          <button className="button" onClick={onSearchConfirm}>
            Confirm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="search-tab-wrapper">
      <div className="tab search-tab ng-star-inserted">
        <ul className="item-ani">
          {categories.map((category, index) => (
            <li
              key={category.key}
              className={activeCategory === category.key ? "active" : ""}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => onCategoryChange(category.key)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onCategoryChange(category.key);
                }
              }}
            >
              {category.label}
            </li>
          ))}
          <li className="search-icon ng-star-inserted" onClick={onSearchToggle}>
            <span
              className="item-icon"
              style={{
                maskImage: 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-search-type02.svg?v=1761636564965")',
              }}
            ></span>
          </li>
        </ul>
      </div>
    </div>
  );
};

// Promo Code Form Component
const PromoCodeForm = ({ showSuccess, showError }) => {
  const [promoCode, setPromoCode] = useState("");

  const handleAddPromoCode = () => {
    const trimmedCode = promoCode.trim();
    if (trimmedCode) {
      showSuccess?.(`Promo code ${trimmedCode} added successfully!`);
      setPromoCode("");
    } else {
      showError?.("Please enter a promo code");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddPromoCode();
    }
  };

  return (
    <form className="promotion-main promo-code-form ng-untouched ng-pristine ng-valid ng-star-inserted">
      <div className="input-group">
        <input
          autoComplete="off"
          type="text"
          maxLength="30"
          className="password ng-untouched ng-pristine ng-valid"
          placeholder="Promo Code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <div
          className="promo-code-add-btn"
          onClick={handleAddPromoCode}
          role="button"
          tabIndex={0}
          onKeyPress={handleKeyPress}
        >
          Add
        </div>
      </div>
    </form>
  );
};

// Waterfall Scroll Component
const WaterfallScroll = ({ promotions, onPromoAction }) => {
  if (promotions.length === 0) {
    return (
      <div className="promotion-main promotion-main-scroll-wrapper ng-trigger ng-trigger-staggerFadeAnimation">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="promotion-main promotion-main-scroll-wrapper ng-trigger ng-trigger-staggerFadeAnimation">
      {promotions.map((promotion, index) => (
        <PromotionCard
          key={promotion.id}
          promotion={promotion}
          index={index}
          onAction={onPromoAction}
        />
      ))}

      <EndOfPagePrompt show={promotions.length > 0} />
      
      <div className="anchor" style={{ height: "10px", visibility: "hidden" }}>
        anchor
      </div>
    </div>
  );
};

// Empty State Component
const EmptyState = () => (
  <div className="empty-state">
    <div className="empty-icon">🎁</div>
    <h3>No promotions found</h3>
    <p>Try changing your search or filter criteria</p>
  </div>
);

// End of Page Prompt Component
const EndOfPagePrompt = ({ show }) => {
  if (!show) return null;
  
  return (
    <div className="prompt ng-star-inserted">
      －end of page－
    </div>
  );
};

// Promotion Card Component
const PromotionCard = ({ promotion, index, onAction }) => {
  const {isJoined, setIsJoined} = useApp();

  const handleButtonClick = ( promotion ,actionType) => {
    if (actionType === "joined") {
      setIsJoined(promotion);
    } else {
      onAction(promotion, actionType);
    }
  };

  const renderButton = () => {
    switch (promotion.bonusType ) {
      case "deposit":
        return (
          <ActionButton
            className="button button__apply"
            onClick={() => handleButtonClick(promotion, "joined")}
            label="Apply Now"
          />
        );
      case "joined":
        return (
          <ActionButton
            className={`button button__joined ${isJoined ? "active" : ""}`}
            onClick={() => handleButtonClick("joined")}
            label={isJoined ? "Joined" : "Join"}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="promotion-box new promotion-toggle ng-star-inserted"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="pic">
        <img 
          alt={promotion.title} 
          src={promotion.image} 
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x150?text=Promotion+Image';
          }}
        />
        <span
          className="item-bg"
          style={{
            maskImage: 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/player/promotion-bg.svg?v=1761636564965")',
          }}
        ></span>
      </div>

      <div className="promotion-box-inner content-style">
        <div className="text-main">
          <h3>{promotion.title}</h3>
          <p>{promotion.description}</p>
        </div>

        <div className="times">
          <span
            className="item-icon"
            style={{
              maskImage: 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-clock.svg?v=1761636564965")',
            }}
          ></span>
          <span>{promotion.type}</span>
        </div>

        <div className="button-box">
          {renderButton()}
          <ActionButton
            className="button btn-primary"
            onClick={() => handleButtonClick("detail")}
            label="Detail"
          />
        </div>
      </div>
    </div>
  );
};

// Reusable Action Button Component
const ActionButton = ({ className, onClick, label }) => (
  <div
    className={className}
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyPress={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        onClick();
      }
    }}
  >
    <span>{label}</span>
  </div>
);

// Mock data function (replace with actual API call)
const getMockPromotions = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [
    {
      id: 1,
      title: "4% Unlimited Bonus + Free Spins",
      description: "Starts at 10:00 PM, to next day 9:59 PM BST!",
      image: "https://img.s628b.com/upload/h5Announcement/image_219729.jpg",
      type: "Limited Offer",
      buttonType: "apply",
      category: "new-promotions",
      bannerImage: "https://img.s628b.com/upload/h5Announcement/image_219729.jpg",
      howToJoin: [
        "লগইন করুন আপনার অ্যাকাউন্টে",
        "প্রোমোশন পৃষ্ঠায় যান",
        "বোনাসে আবেদন করুন",
        "জয় করুন আকর্ষণীয় পুরস্কার!",
      ],
      bonusDetails: [
        { label: "বোনাস পরিমাণ", value: "4% আনলিমিটেড" },
        { label: "মিনিমাম ডিপোজিট", value: "৳500" },
        { label: "মুক্ত স্পিন", value: "20 ফ্রি স্পিন" },
        { label: "বৈধতা", value: "7 দিন" },
      ],
      termsAndConditions: [
        "শুধুমাত্র 18+ ব্যবহারকারীদের জন্য প্রযোজ্য",
        "নূন্যতম ডিপোজিট ৳500 প্রয়োজন",
        "বোনাস 10x ওয়েজার প্রয়োজন",
        "একটি অ্যাকাউন্টে শুধুমাত্র একবার ব্যবহার করা যাবে",
      ],
    },
    // ... include other mock promotions from your original code
  ];
};

export default PromotionPage;