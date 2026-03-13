import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

export default () => {
      const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

      const handleContactCustomerService = () => {
    navigate("/live-chat", {
      state: { background: location },
    });
  };
  return (
    <div className="member-menu-point ng-star-inserted">
      <i>
        <span
          className="item-icon"
          style={{
            backgroundImage:
              'url("https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-customer.png?v=1761636564965")',
          }}
        ></span>
      </i>
      <p>
        গোপনীয়তা এবং নিরাপত্তার জন্য, নিশ্চিতকরণের পরে তথ্য পরিবর্তন করা যাবে
        না। অনুগ্রহ করে{" "}
        <span
          name="liveChatBtn"
          onClick={handleContactCustomerService}
          style={{
            cursor: "pointer",
            color: "#007bff",
            textDecoration: "underline",
          }}
        >
          গ্রাহক পরিষেবার সাথে যোগাযোগ করুন
        </span>
        .
      </p>
    </div>
  );
};
