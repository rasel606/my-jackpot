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


  return {
    balance,
    refreshing,
    handleRefresh,
    setBalance,
  };
};
