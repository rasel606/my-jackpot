// import React from 'react';

// const Announcement = ({ text }) => {
//   return (
//     <div className="announcement-row">
//       <span className="item-icon announcement-icon"></span>
//       <div className="marquee">
//         <ul>
//           <li>
//             <span>
//               <p dangerouslySetInnerHTML={{ __html: text }} />
//             </span>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Announcement;



import React, { useState, useEffect, useRef } from 'react';


const Marquee = ({ 
  announcements = [], 
  speed = 50,
  pauseOnHover = true 
}) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const marqueeRef = useRef(null);
  const contentRef = useRef(null);
  const animationRef = useRef(null);

  // Default announcements if none provided
  const defaultAnnouncements = [
    {
      id: 1,
      content: `🎰 যে কোনো স্লট, লাইভ ক্যাসিনো বা স্পোর্টস গেম খেলুন এবং আনলক করুন ১.৫৩% + ১.১৩% + ০.৯৩% ইনস্ট্যান্ট রিবেট! 💸রিয়েল-টাইম বোনাস সেকশন থেকে যেকোনো সময় রিবেট ক্লেইম করুন।🚀 অপ্ট-ইন করুন HEYVIP EVO Crazy Time ইভেন্ট যুদ্ধ 🌐 www.heyvipwin.com 📈 লিডারবোর্ডে উঠুন এবং জিতুন 💰 ক্যাশ বোনাস + 🎁 গ্র্যান্ড প্রাইজ!`,
      color: '#e74c3c',
      fontSize: '16px',
      icon: 'https://img.s628b.com/sb/h5/assets/images/icon-set/index-theme-icon/index-announcement-icon.svg?v=1760412521693'
    }
  ];

  const displayAnnouncements = announcements.length > 0 ? announcements : defaultAnnouncements;

  useEffect(() => {
    const marqueeElement = marqueeRef.current;
    const contentElement = contentRef.current;

    if (!marqueeElement || !contentElement) return;

    const marqueeWidth = marqueeElement.offsetWidth;
    const contentWidth = contentElement.offsetWidth;

    const animate = () => {
      if (!isPaused) {
        setCurrentPosition(prev => {
          if (prev <= -contentWidth) {
            return marqueeWidth;
          }
          return prev - 1;
        });
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, speed]);

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  };

  return (
    <div className="mcd-marquee ng-star-inserted">
      <div className="announcement-row">
        <span 
          className="item-icon ng-star-inserted"
          style={{ 
            maskImage: `url("${displayAnnouncements[0].icon}")`,
            WebkitMaskImage: `url("${displayAnnouncements[0].icon}")`
          }}
        ></span>
        
        <div 
          ref={marqueeRef}
          className="marquee"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ul 
            ref={contentRef}
            style={{ 
              display: 'flex', 
              width: 'fit-content', 
              transform: `translateX(${currentPosition}px)`
            }}
          >
            {displayAnnouncements.map((announcement) => (
              <li key={announcement.id} className="ng-star-inserted">
                <span>
                  <p>
                    <span style={{ 
                      color: announcement.color, 
                      // fontSize: announcement.fontSize 
                    }}>
                      <strong>{announcement.content}</strong>
                    </span>
                  </p>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Marquee;