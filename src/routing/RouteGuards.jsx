// // components/routing/RouteGuards.jsx
// import React from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

// // Loading component
// const LoadingSpinner = () => (
//   <div className="loading-fullscreen">
//     <div className="spinner"></div>
//     <p>লোড হচ্ছে...</p>
//   </div>
// );

// // Public Route - শুধু হোমপেজ এবং ব্রাউজিং (লগইন ছাড়াই)
// export const PublicRoute = ({ children }) => {
//   const { isLoading } = useAuth();
  
//   if (isLoading) return <LoadingSpinner />;
  
//   return children;
// };

// // Protected Route - গেম খেলা এবং মেম্বার এরিয়ার জন্য (লগইন বাধ্যতামূলক)
// export const ProtectedRoute = ({ children }) => {
//   const { isLoading, isAuthenticated } = useAuth();
//   const location = useLocation();

//   if (isLoading) return <LoadingSpinner />;

//   if (!isAuthenticated) {
//     // লগইন পেজে রিডাইরেক্ট করবে সাথে current location রেখে
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return children;
// };

// // Auth Route - শুধুমাত্র লগইন না করা ইউজার এক্সেস করতে পারবে (লগইন, রেজিস্টার)
// export const AuthRoute = ({ children }) => {
//   const { isLoading, isAuthenticated } = useAuth();
//   const location = useLocation();

//   if (isLoading) return <LoadingSpinner />;

//   if (isAuthenticated) {
//     // আগে যেখানে যেতে চেয়েছিল সেখানে রিডাইরেক্ট করবে, নাহলে হোমে
//     const from = location.state?.from?.pathname;
//     return <Navigate to={location.state?.from?.pathname} replace={true} />;
//   }

//   return children;
// };

// // Game Preview Route - গেম প্রিভিউ দেখার জন্য (লগইন ছাড়াই)
// export const GamePreviewRoute = ({ children }) => {
//   const { isLoading } = useAuth();

//   if (isLoading) return <LoadingSpinner />;
  
//   return children;
// };



// components/routing/RouteGuards.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Loading component
const LoadingSpinner = () => (
  <div className="loading-fullscreen">
    <div className="spinner"></div>
    <p>লোড হচ্ছে...</p>
  </div>
);

// Public Route - শুধু হোমপেজ এবং ব্রাউজিং (লগইন ছাড়াই)
export const PublicRoute = ({ children }) => {
  const { isLoading } = useAuth();
  
  if (isLoading) return <LoadingSpinner />;
  
  return children;
};

// Protected Route - গেম খেলা এবং মেম্বার এরিয়ার জন্য (লগইন বাধ্যতামূলক)
export const ProtectedRoute = ({ children }) => {
  const { isLoading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (isLoading) return <LoadingSpinner />;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ 
      from: location,
      message: "এই পেজ এক্সেস করতে লগইন করুন" 
    }} replace />;
  }

  return children;
};

// Auth Route - শুধুমাত্র লগইন না করা ইউজার এক্সেস করতে পারবে (লগইন, রেজিস্টার)
export const AuthRoute = ({ children }) => {
  const { isLoading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (isLoading) return <LoadingSpinner />;

  if (isAuthenticated) {
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  return children;
};

// Game Preview Route - গেম প্রিভিউ দেখার জন্য (লগইন ছাড়াই)
export const GamePreviewRoute = ({ children }) => {
  const { isLoading } = useAuth();

  if (isLoading) return <LoadingSpinner />;
  
  return children;
};