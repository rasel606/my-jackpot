const NoData = () => {
  return (
    <div className="no-data">
      <div className="no-result">
        <div className="pic">
          <img 
            alt="no-data" 
            src="https://img.s628b.com/sb/h5/assets/images/no-data.png?v=1760412521693&source=mcdsrc"
            loading="lazy" 
          />
        </div>
        <div className="text">No Data</div>
      </div>
    </div>
  );
};

export default NoData;