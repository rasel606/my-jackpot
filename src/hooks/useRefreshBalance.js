// // hooks/useRefreshBalance.js
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { UserAllDetails } from '../Component/Axios-API-Service/AxiosAPIService';
// import { useAuth } from '../Component/AuthContext';

// export const useRefreshBalance = () => {
//   const [balance, setBalance] = useState(0);
//   const [refreshing, setRefreshing] = useState(false);
//   const { userDeatils } = useAuth();
  
//   const userBalance = userDeatils ? userDeatils.balance : "";

//   useEffect(() => {
//     setBalance(userBalance);
//   }, [userBalance]);

//   const handleRefresh = async (userId) => {
//     if (!userId) return;
    
//     setRefreshing(true);
//     try {
//       await handelUserDetails(userId);
//       const response = await fetch.post(
//         "https://api.png71.live/api/v1/user_balance",
//         { userId }
//       );
//       setBalance(response.data.balance);
//       console.log("Balance Data:", response.data);
//     } catch (error) {
//       console.error("Error fetching balance:", error);
//     } finally {
//       setRefreshing(false);
//     }
//   };

//   const handelUserDetails = async (userId) => {
//     const result = await UserAllDetails(userId);
//     setBalance(result.data.user.balance);
//   };

//   return {
//     balance,
//     refreshing,
//     handleRefresh,
//     setBalance
//   };
// };



// hooks/useRefreshBalance.js
import { useState, useEffect } from "react";

import { useAuth } from "../contexts/AuthContext";

export const useRefreshBalance = () => {
  const [balance, setBalance] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const { userDetails } = useAuth(); // ✅ fixed typo

  // Sync initial balance from AuthContext
  useEffect(() => {
    if (userDetails?.balance !== undefined) {
      setBalance(userDetails.balance);
    }
  }, [userDetails]);

  // ✅ Refresh balance manually
  const handleRefresh = async (userId) => {
    if (!userId) return;
    setRefreshing(true);

    try {
      // Optional: update local balance from user detail endpoint
    //   await handleUserDetails(userId);

      // Fetch latest balance directly
      const response = await fetch("https://api.png71.live/api/v1/user_balance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      if (data?.balance !== undefined) {
        setBalance(data.balance);
        console.log("Balance Data:", data);
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    } finally {
      setRefreshing(false);
    }
  };

  // ✅ Fetch user details balance
//   const handleUserDetails = async (userId) => {
//     try {
//       const result = await UserAllDetails(userId); // assuming this still uses fetch or internal API call
//       if (result?.data?.user?.balance !== undefined) {
//         setBalance(result.data.user.balance);
//       }
//     } catch (err) {
//       console.error("Error fetching user details:", err);
//     }
//   };

  return {
    balance,
    refreshing,
    handleRefresh,
    setBalance,
  };
};
