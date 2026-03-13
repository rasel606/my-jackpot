import React from 'react';

const PromotionInfo = ({ 
  promotion,
  showSuccess,
  onClose 
}) => {
  // Destructure with default values to prevent errors
  const {
    img,
    name,
    description,
    howToJoin = [],
    percentage,
    termsAndConditions = [],
    minDeposit,
    validDays,
    wageringRequirement
  } = promotion || {};

  console.log('Promotion Info:', promotion);

  // Prepare bonus details with proper structure
  const bonusDetails = [
    { 
      label: "বোনাস পরিমাণ", 
      value: `${percentage || 'N/A'}% আনলিমিটেড` 
    },
    { 
      label: "মিনিমাম ডিপোজিট", 
      value: `${minDeposit || 'N/A'} ৳` 
    },
    { 
      label: "বৈধতা", 
      value: `${validDays || 'N/A'} দিন` 
    }
  ];

  const title = name || "Promotion";
  const bannerImage = img;

  // Default content if not provided
  const defaultHowToJoin = [
    "লগইন করুন আপনার অ্যাকাউন্টে",
    "প্রোমোশন পৃষ্ঠায় যান",
    "বোনাসে আবেদন করুন",
    "জয় করুন আকর্ষণীয় পুরস্কার!"
  ];

  const defaultTermsAndConditions = [
    `শুধুমাত্র ${wageringRequirement} ব্যবহারকারীদের জন্য প্রযোজ্য`,
    `নূন্যতম ${minDeposit} ডিপোজিট প্রয়োজন`,
    `বোনাস ${wageringRequirement} প্রয়োজন`,
    "একটি অ্যাকাউন্টে শুধুমাত্র একবার ব্যবহার করা যাবে"
  ];

  const handleClaimBonus = () => {
    showSuccess?.(`বোনাসের জন্য আবেদন করা হয়েছে: ${title}`);
  };

  return (
    <div className="promotion-info-popup">
      {/* Close Button */}
      <div className="btn-close" onClick={onClose} role="button" tabIndex={0}>
        <span 
          className="item-icon"
          style={{ 
            maskImage: 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-cross-type01.svg?v=1761636564965")',
            WebkitMaskImage: 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-cross-type01.svg?v=1761636564965")'
          }}
        ></span>
      </div>

      {/* Banner Image */}
      {bannerImage && (
        <div className="detail-banner ng-star-inserted">
          <img 
            alt={title}
            src={bannerImage}
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/811x343?text=Promotion+Banner';
            }}
          />
        </div>
      )}

      {/* Title */}
      <div className="pop-title ng-star-inserted">
        <h3>{title}</h3>
      </div>

      {/* Content */}
      <div className="pop-inner content-style ng-star-inserted">
        <div>
          {/* Description */}
          {description && (
            <PromotionSection 
              content={description}
              type="description"
            />
          )}

          {/* How to Join */}
          <PromotionSection 
            title="কীভাবে যোগদান করবেন:"
            content={howToJoin.length > 0 ? howToJoin : defaultHowToJoin}
            type="howToJoin"
            titleColor="#e74c3c"
          />

          {/* Bonus Details Table */}
          <PromotionSection 
            title="বোনাসের বিবরণ:"
            content={bonusDetails}
            type="bonusDetails"
            titleColor="#e74c3c"
          />

          {/* Terms and Conditions */}
          <PromotionSection 
            title="নিয়ম ও শর্তাবলী:"
            content={termsAndConditions.length > 0 ? termsAndConditions : defaultTermsAndConditions}
            type="termsAndConditions"
            titleColor="#e74c3c"
          />

          {/* Action Button */}
          <div className="promotion-actions">
            <button 
              className="btn-claim-bonus"
              onClick={handleClaimBonus}
            >
              বোনাস দাবি করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Promotion Section Component
const PromotionSection = ({ 
  title, 
  content, 
  type, 
  titleColor = "#3498db" 
}) => {
  const renderContent = () => {
    switch (type) {
      case 'description':
        return (
          <div className="promotion-description">
            <h2>
              <span style={{ color: titleColor, fontSize: '14px', fontFamily: 'Lucida Sans Unicode, Lucida Grande, sans-serif' }}>
                <strong>{content}</strong>
              </span>
            </h2>
          </div>
        );

      case 'howToJoin':
        return (
          <div className="how-to-join-section">
            <h2>
              <span style={{ fontSize: '14px', fontFamily: 'Lucida Sans Unicode, Lucida Grande, sans-serif', color: titleColor }}>
                <strong>{title}</strong>
              </span>
            </h2>
            <ul className="how-to-join-list">
              {content.map((item, index) => (
                <li key={index} className="how-to-join-item">
                  <span style={{ fontSize: '14px', fontFamily: 'Lucida Sans Unicode, Lucida Grande, sans-serif' }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );

      case 'bonusDetails':
        return (
          <div className="bonus-details-section">
            <h2>
              <span style={{ fontSize: '14px', fontFamily: 'Lucida Sans Unicode, Lucida Grande, sans-serif', color: titleColor }}>
                <strong>{title}</strong>
              </span>
            </h2>
            <BonusDetailsTable details={content} />
          </div>
        );

      case 'termsAndConditions':
        return (
          <div className="terms-section">
            <h2>
              <span style={{ fontSize: '14px', fontFamily: 'Lucida Sans Unicode, Lucida Grande, sans-serif', color: titleColor }}>
                <strong>{title}</strong>
              </span>
            </h2>
            <ul className="terms-list">
              {content.map((term, index) => (
                <li key={index} className="terms-item">
                  <span style={{ fontSize: '14px', fontFamily: 'Lucida Sans Unicode, Lucida Grande, sans-serif' }}>
                    {term}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );

      default:
        return <div>{content}</div>;
    }
  };

  return (
    <div className={`promotion-section promotion-section-${type}`}>
      {renderContent()}
    </div>
  );
};

// Bonus Details Table Component
const BonusDetailsTable = ({ details }) => {
  return (
    <table className="bonus-details-table">
      <tbody>
        {details.map((detail, index) => (
          <tr key={index} className="bonus-detail-row">
            <th scope="row" className="bonus-detail-label">
              <span style={{ fontSize: '14px', fontFamily: 'Lucida Sans Unicode, Lucida Grande, sans-serif' }}>
                {detail.label}
              </span>
            </th>
            <td className="bonus-detail-value">
              <span style={{ fontSize: '14px', fontFamily: 'Lucida Sans Unicode, Lucida Grande, sans-serif', fontWeight: 'bold' }}>
                {detail.value}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PromotionInfo;