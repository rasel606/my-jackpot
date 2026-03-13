// components/popups/MessageItem.jsx
import React from "react";
import McdPopupPage from "../../layouts/McdPopupPage";

const MessageItem = ({
  show = false,
  onClose,
  title,
  content,
  position = "top",
  size = "popup-large",
  showCloseButton = true,
  animation = true,
}) => {
  // Prevent event bubbling
  const handleCloseClick = (e) => {
    e.stopPropagation();
    onClose?.();
  };

  const handleBackgroundClick = (e) => {
    // Only close if clicking directly on the background, not the content
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  const handleCloseButtonClick = (e) => {
    e.stopPropagation();
    onClose?.();
  };

  return (
    <McdPopupPage
      show={show}
      onClose={onClose}
      position="center"
      size="medium"
      popupClass="pop-language"
    >
      <div className="popup" id="dialog-1">
        <div className="popup__header">
          {/* Empty header as per original HTML */}
        </div>
        <div className="popup__content">
          <div
            className={`pop-wrap ani ${animation ? "show" : ""}`}
            id="popInbox"
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
          >
            <>
              {showCloseButton && (
                // <a className="btn-close" onClick={handleCloseButtonClick}>
                //   <span
                //     className="item-icon"
                //     style={{
                //       backgroundImage:
                //         'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-cross-type01.svg?v=1761024116679")',
                //     }}
                //   ></span>
                // </a>

                <button className="btn-close" onClick={handleCloseButtonClick}>
                  <span
                    className="item-icon"
                    style={{
                      backgroundImage:
                        'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-cross-type01.svg")',
                    }}
                  ></span>
                </button>
              )}
            </>
            <div className="pop-title">
              <h3>{title}</h3>
            </div>

            <div className="pop-inner content-style">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          </div>

          {/* Background overlay - only close when clicking directly on background */}
          <div
            className="pop-bg"
            style={{ display: "block" }}
            onClick={handleBackgroundClick}
          ></div>
        </div>
      </div>
    </McdPopupPage>
  );
};

export default MessageItem;
