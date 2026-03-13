import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
// import './FeaturedGames.css';

const ScrollBanner = () => {
//   const [games, setGames] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
    const {
      isAuthenticated,
      loginUser,
      logoutUser,
      Token,
      isLoginNotify, setIsLoginNotify,
      token,
      userDeatils,
  
      // loading,
      // setLoading,
    } = useAuth();
   const newNotrify = () => {
       setIsLoginNotify("আপনাকে লগইন করতে হবে খেলার জন্য যদি এখনো আপনার একাউন্ট না থাকে আমাদের সাথে। শুধু সাইন আপ করুন আমাদের সাথে। এটা একেবারেই ফ্রী!");
    }

  const games = [
    {
      id: 1,
      title: "Magic Ace WILD LOCK",
      imageUrl: "https://img.s628b.com/upload/game/JDB/14093.png"
    },
    {
      id: 2,
      title: "Magic Ace",
      imageUrl: "https://img.s628b.com/upload/game/JDB/14088.png"
    },
    {
      id: 3,
      title: "Piggy BanK",
      imageUrl: "https://img.s628b.com/upload/game/JDB/14091.png"
    },
    {
      id: 4,
      title: "Kong",
      imageUrl: "https://img.s628b.com/upload/game/JDB/14055.png"
    },
    {
      id: 5,
      title: "Fruity Bonanza",
      imageUrl: "https://img.s628b.com/upload/game/JDB/14085.png"
    },
    {
      id: 6,
      title: "Elemental Link Fire",
      imageUrl: "https://img.s628b.com/upload/game/JDB/14080.png"
    },
    {
      id: 7,
      title: "DragonsWorld",
      imageUrl: "https://img.s628b.com/upload/game/JDB/14035.png"
    },
    {
      id: 8,
      title: "Golden Empire",
      imageUrl: "https://img.s628b.com/upload/game/AWCMJILI/JILI-SLOT-042.png"
    },
    {
      id: 9,
      title: "BirdsParty",
      imageUrl: "https://img.s628b.com/upload/game/JDB/14033.png"
    },
    {
      id: 10,
      title: "Banana Saga",
      imageUrl: "https://img.s628b.com/upload/game/JDB/8021.png"
    }
  ];

//   useEffect(() => {
//     const fetchGames = async () => {
//       try {
//         const response = await fetch('https://api.png71.live/api/v1/featured');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setGames(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchGames();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

  return (
    <div className="recommend feature-games">
      <div className="recommend-title">
        <h2>Featured Games</h2>
      </div>
      <div className="recommend-bg games">
        <div className="recommend-main games-main">
          {games.map(game => (
            <div key={game._id} className="games-box" >
              <div className="pic">
                <a href="#">
                  <img alt={game.title} src={game.imageUrl} loading="lazy" />
                </a>
              </div>
              <div className="text">
                <h3>{game.title}</h3>
                <div className="like" style={{ 
                  backgroundImage: 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-heart-type02.svg?v=1745315543147")' 
                }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollBanner;