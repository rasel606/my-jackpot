// components/common/LoadingMask.jsx
import React from 'react';
import Logo from '../Logo/Logo';


const LoadingMask = ({ isLoading = true, message = "লোড হচ্ছে..." }) => {
  if (!isLoading) return null;

  return (

    <>
    <div class="loading-mask ng-tns-c4107199800-1 ng-trigger ng-trigger-fastFadeInOut ng-star-inserted" style={{ display: "block" }}>
    </div>
    <div class="loader-box ng-tns-c4107199800-1 ng-star-inserted">
        <div class="movie-box ng-tns-c4107199800-1">
          <video width="100%" height="100%" autoplay="" muted="" loop="" playsinline="" class="ng-tns-c4107199800-1 ng-star-inserted">
            <source src="/assets/images/animation/loader.mov" type="video/quicktime" class="ng-tns-c4107199800-1"/>
              <source rc="/assets/images/animation/loader.webm" type="video/webm" class="ng-tns-c4107199800-1"/>
          </video>
        </div>
    </div>
      </>
   
  );
};

export default LoadingMask;



