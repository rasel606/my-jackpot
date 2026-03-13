// components/member/Turnover/TurnoverTicket.jsx
import React from 'react';

const TurnoverTicket = ({ ticket, onViewDetails }) => {
  const formatCurrency = (amount) => {
    return `৳ ${amount?.toFixed(2) || '0.00'}`;
  };

  return (
    <li className={`ticket ${ticket.status}`} idx={ticket.id}>
      <div className="ticket-inner">
        <div className="ticket-inner-left">
          <div className="title">{ticket.title}</div>
          <div className="detail">
            <div className="date">Event ends in : {ticket.eventEnds}</div>
            <div className="detail-btn">
              <a onClick={onViewDetails}>Detail</a>
            </div>
          </div>
          <div className="discount">
            <div className="amount">{formatCurrency(ticket.amount)}</div>
          </div>
          <div className="progress-bar">
            <div className="bar">
              <div 
                className="bar-inner" 
                style={{ width: `${ticket.progress}%` }}
              ></div>
            </div>
            <div className="number">
              <span>{ticket.turnoverCompleted}</span>
              <span>{ticket.turnoverRequirement}</span>
            </div>
          </div>
        </div>
        <div className="ticket-inner-right">
          <div className="text">
            <span 
              className="item-icon" 
              style={{ 
                backgroundImage: 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-check-type01.svg?v=1761636564965")' 
              }}
            ></span>
            {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
          </div>
        </div>
      </div>
      <div className="ticket-deco open-pop">
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </li>
  );
};

export default TurnoverTicket;