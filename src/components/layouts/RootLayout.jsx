import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../common/Header/Header";
import PlayerToolbar from "../common/Toolbar/PlayerToolbar";
import GuestToolbar from "../common/Toolbar/GuestToolbar";
import Footer from "../Footer/Footer";
import { useAuth } from "../../contexts/AuthContext";

export default function RootLayout() {
    const { isAuthenticated, loading } = useAuth();
    
  const [isMemberMenuOpen, setIsMemberMenuOpen] = useState(false);
  
  return (
    <div className="main-router-wrapper mcd-style ng-tns-c1065443687-0 ng-trigger ng-trigger-routeFullPageAni">
      <div className="ng-tns-c3120749333-2 ng-star-inserted" style={{}}>
        <Header />
        <div className="wrap ng-tns-c3120749333-2">
          <div className="content ng-tns-c3120749333-2 mcd-style" style={{}}>
            <div className="ng-tns-c3120749333-2 ng-trigger ng-trigger-routeLayoutPageAni">
              <Outlet />
            </div>
          </div>
        </div>
        <Footer/>
          {isAuthenticated ? <PlayerToolbar /> : <GuestToolbar />}
      </div>
    </div>
  );
}