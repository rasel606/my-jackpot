import React from 'react';

const TurnoverCard = ({ turnover, onDetailClick }) => {
  // const { id, title, endDate, amount, currentAmount, targetAmount, type } = turnover;

  const progressPercentage = Math.min((turnover.currentAmount / turnover.targetAmount) * 100, 100);
  // turnover.status = turnover.status === 'completed';

  return (
    <li className={`ticket ${turnover.status}`} idx={turnover.id} onClick={() => onDetailClick(turnover)}>
      <div className="ticket-inner">
        <div className="ticket-inner-left">
          <div className="title">{turnover.title}</div>
          <div className="detail">
            <div className="date ng-star-inserted">
              Event ends in : {turnover.eventEnds}
            </div>
            <div className="detail-btn">
              <a>Detail</a>
            </div>
          </div>
          <div className="discount">
            <div className="amount">
              <i style={{ display: 'initial' }}>৳ {turnover.turnoverCompleted.toFixed(2)}</i>
            </div>
          </div>
          <div className="progress-bar">
            <div className="bar">
              <div 
                className="bar-inner" 
                // style={{ width: `${isCompleted ? 100 : progressPercentage}%` }}
                style={{ width: `${turnover.completedRatio}` }}
              ></div>
            </div>
            <div className="number">
               <span>{turnover.turnoverCompleted.toFixed(2)}</span>
              <span>{turnover.turnoverRequirement.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className="ticket-inner-right">
          {/* {turnover.status === 'completed' ? ( */}
            <div className="text ng-star-inserted">
              <span 
                className="item-icon"
                style={{ 
                  backgroundImage: 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-check-type01.svg?v=1761636564965")'
                }}
              ></span>
              {turnover.status === 'completed' ? 'Completed' : 'In Progress'}
            </div>
          {/* ) : ( */}
            {/* <div className="text ng-star-inserted">
              In Progress
            </div> */}
          {/* )} */}
        </div>
      </div>
      <div className="ticket-deco open-pop">
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </li>
  );
};

export default TurnoverCard;