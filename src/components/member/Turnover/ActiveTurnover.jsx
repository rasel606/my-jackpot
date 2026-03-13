// components/member/Turnover/ActiveTurnover.jsx
import React, { useState, useEffect } from 'react';
import TurnoverCard from './TurnoverCard';
import WaterfallScroll from './WaterfallScroll';
import NoData from './NoData';

const ActiveTurnover = ({ handleViewDetails }) => {
  const [activeTurnovers, setActiveTurnovers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActiveTurnovers = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulate empty data for active turnovers
        const data = [
          {
            id: '843130311',
            title: '৪% সীমাহীন বোনাস+ফ্রি স্পিন',
            endDate: '2025/10/27',
            amount: '105.04',
            currentAmount: '105.04',
            targetAmount: '105.04',
            createTime: '2025/10/27',
            status: 'active',
            transactionAmount: '101',
            bonus: '4.04',
            turnoverRequirement: '105.04',
            turnoverCompleted: '105.04',
            completedRatio: '100%'
          },
          {
            id: '829719913',
            title: '৪% সীমাহীন বোনাস+ফ্রি স্পিন',
            endDate: '2025/10/17',
            amount: '108.16',
            currentAmount: '108.16',
            targetAmount: '108.16',
            createTime: '2025/10/17',
            status: 'active',
            transactionAmount: '104',
            bonus: '4.16',
            turnoverRequirement: '108.16',
            turnoverCompleted: '108.16',
            completedRatio: '100%'
          }
        ];
        setActiveTurnovers(data);
      } catch (error) {
        console.error('Error fetching active turnovers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveTurnovers();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (activeTurnovers.length === 0) {
    return <NoData message="No Data" />;
  }

  return (
    <ul className="ticket-wrap ng-trigger ng-trigger-staggerFadeAnimation ng-star-inserted">
      <WaterfallScroll>
        {activeTurnovers.map((turnover) => (
          <TurnoverCard
            key={turnover.id}
            turnover={turnover}
            type="active"
            onClick={() => handleViewDetails(turnover)}
          />
        ))}
      </WaterfallScroll>
    </ul>
  );
};

export default ActiveTurnover;