﻿import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useAuth } from "./AuthContext";
import { launchGameApi } from "../services/launchGameApi ";
import phoneVerificationService from "../services/phoneVerificationService";
import turnoverService from "../services/TurnoverService";
import promotionsService from "../services/promotionService";
import { Navigate, useLocation } from "react-router-dom";
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const location = useLocation();
  const { login, user, setUser } = useAuth();
  const [gameLaunchState, setGameLaunchState] = useState({
    show: false,
    gameUrl: "",
    // providerLogo: '',
    // providerName: '',
    userId: user?.userId || "",
    // userIp: ''
  });




  useEffect(() => {
    // Get the query parameters
    const params = new URLSearchParams(location.search);
    const referralCode = params.get("ref");

    // If referral code exists, open the SignUpModal
    if (referralCode) {
      localStorage.setItem("referralCode", referralCode);
    }
  }, []);

  const [turnoverData, setTurnoverData] = useState({
    active: [],
    completed: [],
    loading: false,
    lastUpdated: null,
  });
  const [userBalance, setUserBalance] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [isJoined, setIsJoined] = useState("");

  const handleRefresh = useCallback(async () => {
    if (refreshing) return;
    if (!user?.userId) {
      return <Navigate to="/login" />;
    }
    setRefreshing(true);

    // handelUserDetails(userId);
    try {
      // handelUserDetails();

      const response = await phoneVerificationService.user_balance_update();
      setUserBalance(response.balance);

      // if (response.data.hasOwnProperty("balance")) {
      //   (token); // Ensure token is available in scope
      // }
    } catch (error) {
      console.error("Error fetching balance:", error);
    } finally {
      setTimeout(() => setRefreshing(false), 1000); // Proper finally block
    }
  },[ user?.userId])


  const [loading, setLoading] = useState(false);

  // ✅ Function to call API and show popup
  const launchGame = async (game) => {
     if (!user?.userId) {
      // The caller should handle navigation to login.
      // We can't navigate from here directly without workarounds.
      // Returning a specific value is a clean way to signal this.
      return { success: false, requiresLogin: true };
    }

    setLoading(true);
    handleRefresh();
    try {
      const gameData = await launchGameApi(
        game.g_code,
        game.p_code,
        user.userId
      );
      setGameLaunchState({ show: true, gameUrl: gameData.gameUrl });
      return { success: true };
    } catch (error) {
      console.error("Unable to launch game:", error);
      // Consider using a global notification system instead of alert
      alert("Unable to launch game. Please try again later.");
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const closeGame = () => {
    setGameLaunchState({
      show: false,
      gameUrl: "",
      // providerLogo: '',
      // providerName: '',
      userName: "",
      userIp: "",
    });
    handleRefresh();
  };

  useEffect(() => {
    if (user?.userId) {
      handleRefresh();
    }
  }, [user?.userId]);


  //-------------------------------Promotions--------------------------------------//

  const [promotions, setPromotions] = useState({
    deposit: [],
    dailyRebate: [],
    weeklyBonus: [],
    all: [],
  });

  const GetPromotionsData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await promotionsService.GetPromotions();

      const organizedPromotions = {
        deposit: response.data.filter((p) => p.bonusType.includes("deposit")),
        dailyRebate: response.data.filter((p) =>
          p.bonusType.includes("dailyRebate")
        ),
        weeklyBonus: response.data.filter((p) =>
          p.bonusType.includes("weeklyBonus")
        ),
        all: response.data,
      };

      setPromotions(organizedPromotions);
    } catch (error) {
      console.error("Error fetching promotions:", error.message);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    GetPromotionsData();
  }, [GetPromotionsData]);
  //-------------------------------turnover--------------------------------------//

  // Turnover API Functions
  const fetchActiveTurnover = useCallback(async () => {
    setTurnoverData((prev) => ({ ...prev, loading: true }));

    try {
      const response = await turnoverService.getActiveTurnover();
      const data = response?.data || [];

      setTurnoverData((prev) => ({
        ...prev,
        active: data,
        loading: false,
        lastUpdated: new Date().toISOString(),
      }));

      return data;
    } catch (error) {
      console.error("Error fetching active turnover data:", error);
      setTurnoverData((prev) => ({
        ...prev,
        loading: false,
      }));
      throw error;
    }
  }, []);

  const fetchCompletedTurnover = useCallback(async () => {
    setTurnoverData((prev) => ({ ...prev, loading: true }));

    try {
      const response = await turnoverService.getCompletedTurnover();
      const data = response?.data || [];

      setTurnoverData((prev) => ({
        ...prev,
        completed: data,
        loading: false,
        lastUpdated: new Date().toISOString(),
      }));

      return data;
    } catch (error) {
      console.error("Error fetching completed turnover data:", error);
      setTurnoverData((prev) => ({
        ...prev,
        loading: false,
      }));
      throw error;
    }
  }, []);
  //-------------------------------turnover--------------------------------------//

  const [settings, setSettings] = useState({
    currency: "BDT",
    language: "English",
    theme: "light",
  });
  const [walletBalance, setWalletBalance] = useState({
    main: 0,
    bonus: 0,
    vipPoints: 0,
  });
  const [games, setGames] = useState([]);
  const [banners, setBanners] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const updateUser = useCallback((userData) => {
    setUser(userData);
  }, []);

  const updateSettings = useCallback((newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  const setLoadingState = useCallback((isLoading) => {
    setLoading(isLoading);
  }, []);

  const addNotification = useCallback((notification) => {
    const newNotification = {
      id: Date.now(),
      ...notification,
      timestamp: new Date().toISOString(),
    };

    setNotifications((prev) => [newNotification, ...prev.slice(0, 4)]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      removeNotification(newNotification.id);
    }, 5000);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  }, []);

  //----------------------vip-----------------------//

  const [vipData, setVipData] = useState({
    currentLevel: "Copper",
    currentPoints: 341,
    experience: 118.68,
    nextLevelExperience: 500,
    nextLevel: "Bronze",
    conversionRatio: 1200,
    minConversionPoints: 5000,
    history: [
      { year: 2025, month: "Oct", level: "Copper", experience: 118.68 },
      { year: 2025, month: "Jul", level: "Copper", experience: 9.67 },
      { year: 2025, month: "Jun", level: "Copper", experience: 163.65 },
      { year: 2025, month: "May", level: "Copper", experience: 0.3 },
    ],
    pointsRecords: {
      received: [],
      used: [],
    },
  });

  const [conversionData, setConversionData] = useState({
    points: 0,
    money: 0,
  });

  const updateConversionData = useCallback(
    (field, value) => {
      setConversionData((prev) => {
        const newData = { ...prev, [field]: value };

        // Auto-calculate the other field
        if (field === "points") {
          newData.money = value / vipData.conversionRatio;
        } else if (field === "money") {
          newData.points = value * vipData.conversionRatio;
        }

        return newData;
      });
    },
    [vipData.conversionRatio]
  );

  const convertPoints = useCallback(() => {
    if (conversionData.points < vipData.minConversionPoints) {
      return {
        success: false,
        message: `Minimum ${vipData.minConversionPoints} VP required`,
      };
    }

    if (conversionData.points > vipData.currentPoints) {
      return { success: false, message: "Insufficient VIP Points" };
    }

    // Simulate API call
    setVipData((prev) => ({
      ...prev,
      currentPoints: prev.currentPoints - conversionData.points,
    }));

    setConversionData({ points: 0, money: 0 });

    return { success: true, message: "Conversion successful!" };
  }, [
    conversionData.points,
    vipData.currentPoints,
    vipData.minConversionPoints,
  ]);

  //---------------------------vip-------------------------//

  const value = {
    user,
    settings,
    loading,
    walletBalance,
    promotions,
    games,
    banners,
    notifications,
    updateUser,
    updateSettings,
    setLoadingState,
    setWalletBalance,
    setPromotions,
    setGames,
    setBanners,
    addNotification,
    removeNotification,
    gameLaunchState,
    launchGame,
    closeGame,
    setGameLaunchState,
    login,
    userBalance,
    handleRefresh,
    refreshing,
    setRefreshing,
    vipData,
    conversionData,
    updateConversionData,
    convertPoints,
    setVipData,
    fetchActiveTurnover,
    fetchCompletedTurnover,
    isJoined,
    setIsJoined,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
