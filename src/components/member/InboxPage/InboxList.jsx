// components/inbox/InboxList.js
import React, { useMemo } from 'react';
import MessageItem from './MessageItem';

const InboxList = ({ messages, selectedMessages, onMessageSelect, editorOpen }) => {
  // Group messages by date
  const groupedMessages = useMemo(() => {
    const groups = {};
    messages.forEach(message => {
      if (!groups[message.date]) {
        groups[message.date] = [];
      }
      groups[message.date].push(message);
    });
    return groups;
  }, [messages]);

  const sortedDates = useMemo(() => 
    Object.keys(groupedMessages).sort((a, b) => new Date(b) - new Date(a))
  , [groupedMessages]);

  if (messages.length === 0) {
    return (
      <div className="list list-message">
        <div className="no-messages">No messages found</div>
      </div>
    );
  }

  return (
    <div className="mcd-waterfall-scroll">
      {sortedDates.map(date => (
        <div key={date} className="list list-message">
          <div className="date-title">
            <div className="date">
              <span 
                className="item-icon" 
                style={{ 
                  maskImage: 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-calendar-type02.svg?v=1760412521693")' 
                }}
              ></span>
              {date}
            </div>
            <div className="time-zone">GMT+6</div>
          </div>
          
          <div className="list-content">
            {groupedMessages[date].map(message => (
              <MessageItem
                key={message.id}
                message={message}
                isSelected={selectedMessages.has(message.id)}
                onSelect={() => onMessageSelect(message.id)}
                editorOpen={editorOpen}
              />
            ))}
          </div>
        </div>
      ))}
      
      <div className="anchor" style={{ height: '10px', visibility: 'hidden' }}>
        anchor
      </div>
    </div>
  );
};

export default InboxList;