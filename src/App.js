import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './contexts/AppContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { PopupProvider } from './components/layouts/PopupManager';
import { LanguageProvider } from './contexts/LanguageContext';
import { PublicRoute, ProtectedRoute, AuthRoute, GamePreviewRoute } from './routing/RouteGuards';

import RootLayout from './components/layouts/RootLayout';
import PopupLayout from './components/layouts/PopupLayout';

import HomePage from './components/pages/HomePage';
import LoginPage from './components/Auth/Login/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import GamesProvidersPage from './components/pages/GamesProvidersPage';
import GameLaunchPopup from './components/layouts/GameLaunchPopup';

import FundsPage from './components/member/Funds/FundsPage';
import PromotionPage from './components/member/PromotionPage/PromotionPage';
import MemberMenu from './components/common/MemberMenu';
import PersonalInfoPage from './components/member/PersonalInfo/PersonalInfoPage';
import AddPhoneNumber from './components/member/AddPhoneNumber/AddPhoneNumber';
import VerificationCode from './components/member/AddPhoneNumber/VerificationCode';
import ChangePassword from './components/member/ChangePassword/ChangePassword';
import ReferBonusPopup from './components/pages/ReferBonusPopup';
import InboxPage from './components/member/InboxPage/InboxPage';
import TransactionRecords from './components/member/TransactionRecords/TransactionRecords';
import BettingRecords from './components/member/BettingRecord/BettingRecords';
import VIPMain from './components/member/VIP/VIPMain';
import VIPHistory from './components/member/VIP/VIPHistory';
import VIPPointsRecords from './components/member/VIP/VIPPointsRecords';
import TurnoverPage from './components/member/Turnover/TurnoverPage';

import Notification from './components/layouts/Notification';
import { useNotificationState } from './hooks/useNotificationState';

import { useApi } from './hooks/useApi';
import { useGamePlay } from './hooks/useGamePlay';

import MyPromotionPage from './components/member/PromotionPage/MyPromotionPage';
import RealTimeBonus from './components/member/RealTimeBonus/RealTimeBonus';

import AddEmail from './components/member/AddEmail/AddEmail';
import AddFullName from './components/member/AddName/AddName';

const AppWithNotifications = ({ children }) => {
  const notificationState = useNotificationState();

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        showError: notificationState.showError,
        showSuccess: notificationState.showSuccess,
        showWarning: notificationState.showWarning,
        showInfo: notificationState.showInfo
      });
    }
    return child;
  });

  return (
    <>
      {childrenWithProps}
      <Notification
        isOpen={notificationState.notification.isOpen}
        onClose={notificationState.hideNotification}
        title={notificationState.notification.title}
        message={notificationState.notification.message}
        type={notificationState.notification.type}
        autoClose={notificationState.notification.autoClose}
        autoCloseDuration={notificationState.notification.autoCloseDuration}
        position={notificationState.notification.position}
      />
    </>
  );
};

function AppContent({ showError, showSuccess, showWarning, showInfo }) {
  const location = useLocation();
  const background = location.state?.background;
  const { gameLaunchState, closeGame } = useApp();

  return (
    <>
      {/* Main Routes */}
      <Routes location={background || location}>
        {/* Public Routes - লগইন ছাড়াই দেখা যাবে */}
        <Route path="/" element={
          <PublicRoute>
            <RootLayout
              showError={showError}
              showSuccess={showSuccess}
              showWarning={showWarning}
              showInfo={showInfo}
            />
          </PublicRoute>
        }>
          {/* Home Page - লগইন ছাড়াই দেখা যাবে */}
          <Route index element={
            <PublicRoute>
              <HomePage
                showError={showError}
                showSuccess={showSuccess}
              />
            </PublicRoute>
          } />

          {/* Game Provider Pages - লগইন ছাড়াই দেখা যাবে (শুধু প্রিভিউ) */}
          <Route path="gamesProvidersPage/:category_name/:providercode" element={
            <GamePreviewRoute>
              <GamesProvidersPage
                showError={showError}
                showSuccess={showSuccess}
              />
            </GamePreviewRoute>
          } />

          {/* Game Launch - লগইন বাধ্যতামূলক */}
          <Route path="play/:gameId" element={
            <ProtectedRoute>
              <GameLaunchPopup
                showError={showError}
                showSuccess={showSuccess}
              />
            </ProtectedRoute>
          } />
        </Route>

        {/* Authentication Routes - শুধুমাত্র লগইন না করা ইউজার */}
        <Route path="/login" element={
          <AuthRoute>
            <PopupLayout>
              <LoginPage
                showError={showError}
                showSuccess={showSuccess}
                showWarning={showWarning}
                showInfo={showInfo}
              />
            </PopupLayout>
          </AuthRoute>
        } />

        <Route path="/register" element={
          <AuthRoute>
            <PopupLayout>
              <RegisterPage
                showError={showError}
                showSuccess={showSuccess}
                showWarning={showWarning}
                showInfo={showInfo}
              />
            </PopupLayout>
          </AuthRoute>
        } />

        {/* 404 Route */}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>

      {/* Popup Routes - Background location জন্য */}
      {background && (
        <Routes>
          {/* Public Popups - লগইন ছাড়াই দেখা যাবে */}
          <Route path="/promotion" element={
            <PublicRoute>
              <PopupLayout title="প্রোমোশন">
                <PromotionPage
                  showError={showError}
                  showSuccess={showSuccess}
                  showWarning={showWarning}
                  showInfo={showInfo}
                />
              </PopupLayout>
            </PublicRoute>
          } />

          {/* Protected Member Popups - শুধুমাত্র লগইন ইউজার */}
          <Route path="/deposit" element={
            <ProtectedRoute>
              <PopupLayout title="ডিপোজিট">
                <FundsPage
                  showError={showError}
                  showSuccess={showSuccess}
                  showWarning={showWarning}
                  showInfo={showInfo}
                />
              </PopupLayout>
            </ProtectedRoute>
          } />

          <Route path="/withdrawal" element={
            <ProtectedRoute>
              <PopupLayout title="উত্তোলন">
                <FundsPage
                  showError={showError}
                  showSuccess={showSuccess}
                  showWarning={showWarning}
                  showInfo={showInfo}
                />
              </PopupLayout>
            </ProtectedRoute>
          } />

          <Route path="/account" element={
            <ProtectedRoute>
              <PopupLayout title="আমার অ্যাকাউন্ট">
                <MemberMenu
                  showError={showError}
                  showSuccess={showSuccess}
                  showWarning={showWarning}
                  showInfo={showInfo}
                />
              </PopupLayout>
            </ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute>
              <PopupLayout title="প্রোফাইল">
                <PersonalInfoPage
                  showError={showError}
                  showSuccess={showSuccess}
                  showWarning={showWarning}
                  showInfo={showInfo}
                />
              </PopupLayout>
            </ProtectedRoute>
          } />

          {/* Authentication Popups */}
          <Route path="/login" element={
            <AuthRoute>
              <PopupLayout title="লগইন">
                <LoginPage
                  showError={showError}
                  showSuccess={showSuccess}
                  showWarning={showWarning}
                  showInfo={showInfo}
                />
              </PopupLayout>
            </AuthRoute>
          } />

          <Route path="/register" element={
            <AuthRoute>
              <PopupLayout title="রেজিস্টার">
                <RegisterPage
                  showError={showError}
                  showSuccess={showSuccess}
                  showWarning={showWarning}
                  showInfo={showInfo}
                />
              </PopupLayout>
            </AuthRoute>
          } />

          <Route path="/add_phone_number" element={
            <ProtectedRoute>
              <PopupLayout showBackButton={true}>
                <AddPhoneNumber
                  showError={showError}
                  showSuccess={showSuccess}
                  showWarning={showWarning}
                  showInfo={showInfo}
                />
              </PopupLayout>
            </ProtectedRoute>
          } />
          <Route path="/verify_code" element={
            <ProtectedRoute>
              <PopupLayout showBackButton={true} className="third-party-login verify-code">
                <VerificationCode
                  showError={showError}
                  showSuccess={showSuccess}
                  showWarning={showWarning}
                  showInfo={showInfo}
                />
              </PopupLayout>
            </ProtectedRoute>
          } />
          // In your App.jsx or routing file
          <Route path="/turnover/active" element={
            <ProtectedRoute>
              <PopupLayout showBackButton={true} className="third-party-login verify-code">
                <TurnoverPage showError={showError} showSuccess={showSuccess} showWarning={showWarning} showInfo={showInfo} />
              </PopupLayout>
            </ProtectedRoute>} />
          <Route path="/turnover/completed" element={
            <ProtectedRoute>
              <PopupLayout showBackButton={true} className="third-party-login verify-code">
                <TurnoverPage showError={showError} showSuccess={showSuccess} showWarning={showWarning} showInfo={showInfo} />
              </PopupLayout>
            </ProtectedRoute>} />
          <Route path="/turnover" element={
            <ProtectedRoute>
              <PopupLayout showBackButton={true} className="third-party-login verify-code">
                <TurnoverPage showError={showError} showSuccess={showSuccess} showWarning={showWarning} showInfo={showInfo} />
              </PopupLayout>
            </ProtectedRoute>} />
          <Route path="/update-name" element={
            <ProtectedRoute>
              <PopupLayout showBackButton={true} className="third-party-login verify-code">
                <AddFullName showError={showError} showSuccess={showSuccess} showWarning={showWarning} showInfo={showInfo} />
              </PopupLayout>
            </ProtectedRoute>} />

          <Route path="/add-email" element={
            <ProtectedRoute>
              <PopupLayout showBackButton={true} className="third-party-login verify-code">
                <AddEmail
                  showError={showError}
                  showSuccess={showSuccess}
                  showWarning={showWarning}
                  showInfo={showInfo}
                />
              </PopupLayout>
            </ProtectedRoute>
          } />
          <Route path="/verify_email_code" element={
            <ProtectedRoute>
              <PopupLayout showBackButton={true} className="third-party-login verify-code">
                <VerificationCode
                  showError={showError}
                  showSuccess={showSuccess}
                  showWarning={showWarning}
                  showInfo={showInfo}
                />
              </PopupLayout>
            </ProtectedRoute>
          } />
          <Route path="/transaction-records" element={
            <ProtectedRoute>
              <PopupLayout>
                <TransactionRecords
                  showError={showError}
                  showSuccess={showSuccess}
                  showWarning={showWarning}
                  showInfo={showInfo}
                />
              </PopupLayout>
            </ProtectedRoute>
          } />
          <Route path="/inbox" element={
            <ProtectedRoute>
              <PopupLayout className="third-party-login verify-code">
                <InboxPage
                  showError={showError}
                  showSuccess={showSuccess}
                  showWarning={showWarning}
                  showInfo={showInfo}
                />
              </PopupLayout>
            </ProtectedRoute>
          } />
          <Route path="/real-time-bonus" element={
            <ProtectedRoute>
              <PopupLayout className="third-party-login verify-code">
                <RealTimeBonus
                  showError={showError}
                  showSuccess={showSuccess}
                  showWarning={showWarning}
                  showInfo={showInfo}
                />
              </PopupLayout>
            </ProtectedRoute>
          } />
          <Route path="/my_promotion" element={
            <ProtectedRoute>
              <PopupLayout className="third-party-login verify-code">
                <MyPromotionPage
                  showError={showError}
                  showSuccess={showSuccess}
                  showWarning={showWarning}
                  showInfo={showInfo}
                />
              </PopupLayout>
            </ProtectedRoute>
          } />
          <Route path="/betting-records" element={
            <ProtectedRoute>
              <PopupLayout className="third-party-login verify-code">
                <BettingRecords
                  showError={showError}
                  showSuccess={showSuccess}
                  showWarning={showWarning}
                  showInfo={showInfo}
                />
              </PopupLayout>
            </ProtectedRoute>
          } />
          <Route path="/change-password" element={
            <ProtectedRoute>
              <PopupLayout>
                <ChangePassword
                  showError={showError}
                  showSuccess={showSuccess}
                  showWarning={showWarning}
                  showInfo={showInfo}
                />
              </PopupLayout>
            </ProtectedRoute>
          } />
          <Route path="/refer-bonus" element={
            <ProtectedRoute>
              <PopupLayout>
                <ReferBonusPopup
                  showError={showError}
                  showSuccess={showSuccess}
                  showWarning={showWarning}
                  showInfo={showInfo}
                />
              </PopupLayout>
            </ProtectedRoute>
          } />

          <Route path="/vip-points-exchange" element={
            <ProtectedRoute>
              <PopupLayout title="My VIP">
                <VIPMain />
              </PopupLayout>
            </ProtectedRoute>
          } />
          <Route path="/vip-history" element={
            <ProtectedRoute>
              <PopupLayout title="VIP History" showBackButton={true}>
                <VIPHistory />
              </PopupLayout>
            </ProtectedRoute>
          } />
          <Route path="/vip-points-records" element={
            <ProtectedRoute>
              <PopupLayout title="VIP Points (VP)" showBackButton={true}>
                <VIPPointsRecords />
              </PopupLayout>
            </ProtectedRoute>
          } />

          {/* Turnover Route */}
          <Route path="/turnover" element={
            <ProtectedRoute>
              <PopupLayout title="Turnover">
                <TurnoverPage
                  showError={showError}
                  showSuccess={showSuccess}
                  showWarning={showWarning}
                  showInfo={showInfo}
                />
              </PopupLayout>
            </ProtectedRoute>
          } />
        </Routes>

      )}

      {/* Game Launch Modal */}
      <GameLaunchPopup
        show={gameLaunchState?.show}
        onClose={closeGame}
        gameUrl={gameLaunchState?.gameUrl}
        gameId={gameLaunchState?.gameId}
        userName={gameLaunchState?.userName}
      />
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppProvider>
          <PopupProvider>
            <AppWithNotifications>
              <AppContent />
            </AppWithNotifications>
          </PopupProvider>
        </AppProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;