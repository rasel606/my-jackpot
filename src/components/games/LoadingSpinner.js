import React from 'react';

const LoadingSpinner = ({ hasMore, loading }) => {
  { hasMore && <div className="list-loading"></div> }
  { !hasMore && <div className="prompt">－end of page－</div> }
};

export default LoadingSpinner;