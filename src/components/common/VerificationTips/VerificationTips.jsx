// // components/common/VerificationTips/VerificationTips.js
// import React, { useState } from 'react';

// const VerificationTips = ({ 
//   type = 'deposit', // 'deposit' or 'withdrawal'
//   title,
//   description,
//   requirements = []
// }) => {
//   const [isExpanded, setIsExpanded] = useState(true);

//   const toggleExpansion = () => {
//     setIsExpanded(!isExpanded);
//   };

//   // Default content based on type
//   const defaultContent = {
//     deposit: {
//       title: "ডিপোজিট অনুরোধ এগিয়ে নিতে নীচের তথ্যগুলি প্রয়োজন।",
//       requirements: [
//         {
//           category: "Contact Info",
//           items: ["ফোন নাম্বার"]
//         }
//       ]
//     },
//     withdrawal: {
//       title: "উইথড্রয়াল রিকোয়েস্ট সম্পন্ন করার আগে অনুগ্রহপূর্বক নীচের ভেরিফিকেশন সম্পূর্ণ করুন।",
//       requirements: [
//         {
//           category: "ব্যাক্তিগত তথ্য",
//           items: ["সম্পূর্ণ নাম"]
//         },
//         {
//           category: "Contact Info",
//           items: ["ফোন নাম্বার"]
//         }
//       ]
//     }
//   };

//   const content = {
//     title: title || defaultContent[type]?.title,
//     requirements: requirements.length > 0 ? requirements : defaultContent[type]?.requirements
//   };

//   return (
//     <div className="ng-trigger ng-trigger-slideAnimation ng-star-inserted">
//       <div className="tips-info verify-tips tips-info-toggle ng-star-inserted">
//         <div className="title-box" onClick={toggleExpansion}>
//           <h5>
//             <i
//               className="tips-icon"
//               style={{
//                 maskImage: 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-tips-type02.svg?v=1761636564965")',
//               }}
//             ></i>
//             <span>{content.title}</span>
//           </h5>
//           <div
//             className={`toggle-btn ng-star-inserted ${isExpanded ? 'active' : ''}`}
//             style={{
//               maskImage: 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-arrow-type09.svg?v=1761636564965")',
//               transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
//               transition: 'transform 0.3s ease'
//             }}
//           ></div>
//         </div>
//         <ol className={`tips-info-block ${isExpanded ? 'active' : ''}`}>
//           {content.requirements.map((requirement, index) => (
//             <li key={index} className={`${requirement.category.toLowerCase().includes('contact') ? 'contact-info' : 'personal-info'} ng-star-inserted`}>
//               <a className="ng-star-inserted">
//                 <label>{requirement.category}</label>
//                 <ul>
//                   {requirement.items.map((item, itemIndex) => (
//                     <li key={itemIndex} className="ng-star-inserted">{item}</li>
//                   ))}
//                 </ul>
//               </a>
//             </li>
//           ))}
//         </ol>
//       </div>
//     </div>
//   );
// };

// export default VerificationTips;

// components/common/VerificationTips/VerificationTips.js
import React, { useState } from 'react';

const VerificationTips = ({ user, type = 'both' }) => {
  const [isDepositExpanded, setIsDepositExpanded] = useState(true);
  const [isWithdrawalExpanded, setIsWithdrawalExpanded] = useState(true);

  // Check verification status
  const hasVerifiedPhone = user?.phone?.some(phone => phone.verified) || false;
  const hasDefaultPhone = user?.phone?.some(phone => phone.isDefault) || false;
  const hasName = !!user?.name;
  const hasAnyPhone = user?.phone && user.phone.length > 0;

  // Determine which requirements are missing
  const getMissingDepositRequirements = () => {
    const missing = [];
    if (!hasVerifiedPhone) missing.push('ফোন নাম্বার');
    return missing;
  };

  const getMissingWithdrawalRequirements = () => {
    const missing = [];
    if (!hasName) missing.push('সম্পূর্ণ নাম');
    if (!hasVerifiedPhone) missing.push('ফোন নাম্বার');
    return missing;
  };

  const missingDeposit = getMissingDepositRequirements();
  const missingWithdrawal = getMissingWithdrawalRequirements();

  // Don't show if all requirements are met
  if ((type === 'deposit' && missingDeposit.length === 0) || 
      (type === 'withdrawal' && missingWithdrawal.length === 0) ||
      (type === 'both' && missingDeposit.length === 0 && missingWithdrawal.length === 0)) {
    return null;
  }

  const toggleDeposit = () => setIsDepositExpanded(!isDepositExpanded);
  const toggleWithdrawal = () => setIsWithdrawalExpanded(!isWithdrawalExpanded);

  return (
    <>
      {/* Deposit Verification Tips */}
      {(type === 'deposit' || type === 'both') && missingDeposit.length > 0 && (
        <div className="ng-trigger ng-trigger-slideAnimation ng-star-inserted">
          <div className="tips-info verify-tips tips-info-toggle ng-star-inserted">
            <div className="title-box" onClick={toggleDeposit}>
              <h5>
                <i
                  className="tips-icon"
                  style={{
                    maskImage: 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-tips-type02.svg?v=1761636564965")',
                  }}
                ></i>
                <span>ডিপোজিট অনুরোধ এগিয়ে নিতে নীচের তথ্যগুলি প্রয়োজন।</span>
              </h5>
              <div
                className={`toggle-btn ng-star-inserted ${isDepositExpanded ? 'expanded' : ''}`}
                style={{
                  maskImage: 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-arrow-type09.svg?v=1761636564965")',
                  transform: isDepositExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}
              ></div>
            </div>
            {isDepositExpanded && (
              <ol className="tips-info-block active">
                <li className="contact-info ng-star-inserted">
                  <a className="ng-star-inserted">
                    <label>Contact Info</label>
                    <ul>
                      {missingDeposit.map((requirement, index) => (
                        <li key={index} className="ng-star-inserted">
                          {requirement}
                        </li>
                      ))}
                    </ul>
                  </a>
                </li>
              </ol>
            )}
          </div>
        </div>
      )}

      {/* Withdrawal Verification Tips */}
      {(type === 'withdrawal' || type === 'both') && missingWithdrawal.length > 0 && (
        <div className="ng-trigger ng-trigger-slideAnimation ng-star-inserted">
          <div className="tips-info verify-tips tips-info-toggle ng-star-inserted">
            <div className="title-box" onClick={toggleWithdrawal}>
              <h5>
                <i
                  className="tips-icon"
                  style={{
                    maskImage: 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-tips-type02.svg?v=1761636564965")',
                  }}
                ></i>
                <span>উইথড্রয়াল রিকোয়েস্ট সম্পন্ন করার আগে অনুগ্রহপূর্বক নীচের ভেরিফিকেশন সম্পূর্ণ করুন।</span>
              </h5>
              <div
                className={`toggle-btn ng-star-inserted ${isWithdrawalExpanded ? 'expanded' : ''}`}
                style={{
                  maskImage: 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-arrow-type09.svg?v=1761636564965")',
                  transform: isWithdrawalExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}
              ></div>
            </div>
            {isWithdrawalExpanded && (
              <ol className="tips-info-block active">
                {!hasName && (
                  <li className="personal-info ng-star-inserted">
                    <a className="ng-star-inserted">
                      <label>ব্যাক্তিগত তথ্য</label>
                      <ul>
                        <li className="ng-star-inserted">সম্পূর্ণ নাম</li>
                      </ul>
                    </a>
                  </li>
                )}
                {!hasVerifiedPhone && (
                  <li className="contact-info ng-star-inserted">
                    <a className="ng-star-inserted">
                      <label>Contact Info</label>
                      <ul>
                        <li className="ng-star-inserted">ফোন নাম্বার</li>
                      </ul>
                    </a>
                  </li>
                )}
              </ol>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default VerificationTips;