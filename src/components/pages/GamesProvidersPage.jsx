

import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import GameBox from "../games/GameBox";
import SearchTab from "../games/SearchTab";
import SearchPage from "../games/SearchPage";
import SortBar from "../games/SortBar";
import JackpotBanner from "../games/JackpotBanner";
import { useGamePlay } from "../../hooks/useGamePlay";
import { useApp } from "../../contexts/AppContext";
import { useAuth } from "../../contexts/AuthContext";

const GamesProvidersPage = () => {
  const { category_name, providercode } = useParams();
  const [data, setData] = useState([]);
  const [gameData, setGameData] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(
    providercode ? [providercode] : "ALL"
  );

  const { gameLaunchState, closeGame, launchGame, setGameLaunchState,handleRefresh } = useApp();
  const [sortOption, setSortOption] = useState("recommend");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const loader = useRef();
  const limit = 24;
  const { apiCall } = useApi();
  const { user,isAuthenticated } = useAuth();
  const navigate = useNavigate();
  // const { handleRefresh } = useApp();


  const { 
    isPlaying, 
    playGameData, 
    showPopup, 
    handlePlay, 
    handleClosePopup 
  } = useGamePlay();

  // Fetch providers data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await apiCall("/New-table-Games-with-Providers", "GET", {
          category_name: category_name,
        });
        console.log("GamesProvidersPage category result", result.data);
        if (result.success) {
          setData(result.data[0] || {});
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [category_name]);

  // Handle provider selection
  const handleProviderChange = (provider) => {
    let newSelection;

    if (provider === "ALL") {
      newSelection = "ALL";
    } else {
      const currentSelection =
        selectedProvider === "ALL" ? [] : [...selectedProvider];

      if (currentSelection.includes(provider)) {
        // Remove provider from selection
        newSelection = currentSelection.filter((p) => p !== provider);
      } else {
        // Add provider to selection
        newSelection = [...currentSelection, provider];
      }

      // If selection is empty, revert to "ALL"
      if (newSelection.length === 0) {
        newSelection = "ALL";
      }
    }

    setSelectedProvider(newSelection);
    setPage(0);
    setGameData([]);
    setHasMore(true);
  };

  // Fetch games with filters
  const fetchGames = async () => {
    if (!hasMore || isLoading) return;

    try {
      setIsLoading(true);
      const providerParam = selectedProvider === "ALL" 
        ? "" 
        : Array.isArray(selectedProvider) 
          ? selectedProvider.join(",") 
          : selectedProvider;

      const result = await apiCall(
        "/New-Games-with-Providers-By-Category",
        "GET",
        {
          category_name: category_name,
          page: page,
          provider: providerParam,
          gameName: searchQuery,
          sortBy: sortOption,
        }
      );

      console.log("GET GamesProvidersPage result:", result);

      if (result.success) {
        if (result.data.length < limit) setHasMore(false);
        setGameData((prev) => [...prev, ...result.data]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error fetching games:", error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset and fetch when filters change
  useEffect(() => {
    setPage(0);
    setGameData([]);
    setHasMore(true);
  }, [selectedProvider, searchQuery, sortOption, category_name]);

  // Infinite scroll setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          fetchGames();
        }
      },
      { threshold: 1 }
    );

    const currentLoader = loader.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [hasMore, isLoading, fetchGames]);

  const handleSearchConfirm = () => {
    setShowSearch(false);
    setPage(0);
    setGameData([]);
    setHasMore(true);
  };

  //////////===========================================handle effects lunch game==================//////////

  // Fixed handleGamePlay function with authentication check
  const handleGamePlay = async (game) => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: { from: window.location.pathname },
      });
      return;
    }

    // If user is authenticated, launch the game
    const result = await launchGame(game);
    console.log("Game launch result:", result);
    if (result?.success) {
      console.log("Game launched successfully");
    } else if (result?.requiresLogin) {
      navigate("/login", { state: { from: window.location.pathname } });
    } else {
      console.error("Game launch failed:", result?.error);
    }
  };

  // Handle game link click with authentication
  // const handleGameLinkClick = (game) => {
  //   // e.preventDefault();
  //   handleGamePlay(game);
  // };


//////////===========================================handle effects lunch game==================//////////

  return (
    <div className="content mcd-style">
      <div className="content-main">
        <div className="content-box">
          <div className="games">
            <JackpotBanner />
            
            {/* Search Tab Component */}
            <SearchTab
              providers={data.uniqueProviders || []}
              selectedProvider={selectedProvider}
              onProviderChange={handleProviderChange}
              showSearch={showSearch}
              setShowSearch={setShowSearch}
            />

            {/* Search Page Component */}
            <SearchPage
              showSearch={showSearch}
              setShowSearch={setShowSearch}
              providers={data.uniqueProviders || []}
              selectedProvider={selectedProvider}
              onProviderChange={handleProviderChange}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onConfirm={handleSearchConfirm}
            />

            {/* Sort Bar Component */}
            <SortBar 
              sortOption={sortOption} 
              setSortOption={setSortOption} 
              title={category_name || "Games"}
            />

            {/* Games Grid */}
            <div className="games-main">
              {gameData.map((game) => (
                <GameBox
                  key={game._id}
                  game={game}
                  onPlay={handleGamePlay}
                  type="game"
                />
              ))}
            </div>

            {/* Loading and End of Page */}
            <div ref={loader} className="loading">
              {isLoading && <div className="list-loading">Loading more games...</div>}
              {!hasMore && gameData.length > 0 && (
                <div className="prompt">－end of page－</div>
              )}
              {!hasMore && gameData.length === 0 && !isLoading && (
                <div className="prompt">No games found</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Game Popup would go here */}
      {/* {showPopup && (
        <GamePopup
          showPopup={showPopup}
          playGameData={playGameData}
          onClose={handleClosePopup}
          title="Game"
        />
      )} */}
    </div>
  );
};

export default GamesProvidersPage;
        