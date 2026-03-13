
// // hooks/useGameData.js
// import { useState, useEffect } from 'react';
// import { useApi } from './useApi';

// export const useGameData = (initialUrl = "https://api.png71.live/api/games/New-table-Games-with-Providers", category_name, selectedProvider) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [active, setActive] = useState(null);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [gameData, setGameData] = useState([]);
  
//   const { apiCall } = useApi();

//   const fetchGameData = async (url = initialUrl) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(url, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
//       console.log("Game categories result:", result);
//       setData(result.data || []);

//       // Set initial active state
//       if (result.data && result.data.length > 0) {
//         setActive(result.data[0]?.category);
//         setActiveIndex(0);
//       }

//       return result;
//     } catch (err) {
//       console.error("Error fetching game data:", err);
//       setError("গেম ডেটা লোড করতে সমস্যা হচ্ছে");
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchGames = async (category_name) => {
//     if (!category_name) return;
    
//     try {
//       // setLoading(true);
//       const result = await apiCall(
//         "/New-Games-with-Providers-By-Category",
//         "GET",
//         {
//           category_name: category_name,
//         }
//       );

//       console.log("GET GamesProvidersPage result:", result);
//       setGameData(result.data || []);
//     } catch (error) {
//       console.error("Error fetching games:", error);
//     // } finally {
//     //   setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchGameData();
//   }, []);

//   // Fetch games when active category changes
//   useEffect(() => {
//     if (active && active.category_name) {
//       fetchGames(active.category_name || "");
//     }
//   }, [active, data]);

//   console.log(data)
//   // Set initial active category when data loads
//   useEffect(() => {
//     if (data.length > 0 && !active) {
//       setActive(data[0]);
//       setActiveIndex(0);
//     }
//   }, [data, active]);

//   const handleItemClick = (index, item, onClose) => {
//     setActiveIndex(index);
//     setActive(item?.category || item);
//     // if (onClose ) {
//     //   onClose();
//     // }
//   };

//   const refetch = () => {
//     return fetchGameData();
//   };

//   const setActiveCategory = (categoryName) => {
//     const categoryIndex = data.findIndex(
//       item => item?.category?.name === categoryName
//     );
//     if (categoryIndex !== -1) {
//       setActiveIndex(categoryIndex);
//       setActive(data[categoryIndex]?.category);
//     }
//   };

//   return {
//     data,
//     loading,
//     error,
//     active,
//     activeIndex,
//     handleItemClick,
//     setActiveCategory,
//     refetch,
//     setActive,
//     setActiveIndex,
//     gameData
//   };
// };



// hooks/useGameData.js
import { useState, useEffect } from 'react';
import { useApi } from './useApi';

export const useGameData = (initialUrl = "https://api.png71.live/api/games/New-table-Games-with-Providers", category_name, selectedProvider) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [active, setActive] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [gameData, setGameData] = useState([]);
  
  const { apiCall } = useApi();

  const fetchGameData = async (url = initialUrl) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Game categories result:", result);
      setData(result.data || []);

      // Set initial active state
      if (result.data && result.data.length > 0) {
        setActive(result.data[0]?.category);
        setActiveIndex(0);
      }

      return result;
    } catch (err) {
      console.error("Error fetching game data:", err);
      setError("গেম ডেটা লোড করতে সমস্যা হচ্ছে");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchGames = async (category_name) => {
    if (!category_name) return;
    
    try {
      const result = await apiCall(
        "/New-Games-with-Providers-By-Category",
        "GET",
        {
          category_name: category_name,
        }
      );

      console.log("GET GamesProvidersPage result:", result);
      setGameData(result.data || []);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  useEffect(() => {
    fetchGameData();
  }, []);

  // Fetch games when active category changes
  useEffect(() => {
    if (active && active.category_name) {
      fetchGames(active.category_name || "");
    }
  }, [active, data]);

  // Set initial active category when data loads
 

  const handleItemClick = (index, item, onClose, shouldClose = true) => {
    setActiveIndex(index);
    setActive(item?.category || item);
    
    // Only call onClose if provided and shouldClose is true
    if (onClose && shouldClose) {
      onClose();
    }
  };

  const refetch = () => {
    return fetchGameData();
  };

  const setActiveCategory = (categoryName) => {
    const categoryIndex = data.findIndex(
      item => item?.category?.name === categoryName
    );
    if (categoryIndex !== -1) {
      setActiveIndex(categoryIndex);
      setActive(data[categoryIndex]?.category);
    }
  };

  return {
    data,
    loading,
    setLoading,
    error,
    active,
    activeIndex,
    handleItemClick,
    setActiveCategory,
    refetch,
    setActive,
    setActiveIndex,
    gameData
  };
};