import React, { useState, useEffect } from 'react';
import TurnoverCard from './TurnoverCard';
import WaterfallScroll from './WaterfallScroll';

const CompletedTurnover = ({ handleViewDetails }) => {
  const [completedTurnovers, setCompletedTurnovers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompletedTurnovers = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const data = [
          {
            id: '843130311',
            title: '৪% সীমাহীন বোনাস+ফ্রি স্পিন',
            endDate: '2025/10/27',
            amount: '105.04',
            currentAmount: '105.04',
            targetAmount: '105.04',
            createTime: '2025/10/27',
            status: 'completed',
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
            status: 'completed',
            transactionAmount: '104',
            bonus: '4.16',
            turnoverRequirement: '108.16',
            turnoverCompleted: '108.16',
            completedRatio: '100%'
          }
        ];
        setCompletedTurnovers(data);
      } catch (error) {
        console.error('Error fetching completed turnovers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedTurnovers();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <ul className="ticket-wrap ng-trigger ng-trigger-staggerFadeAnimation ng-star-inserted">
      <WaterfallScroll>
        {completedTurnovers.map((turnover) => (
          <TurnoverCard
            key={turnover.id}
            turnover={turnover}
            type="completed"
            onClick={() => handleViewDetails(turnover)}
          />
        ))}
      </WaterfallScroll>
    </ul>
  );
};

export default CompletedTurnover;