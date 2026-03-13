// components/inbox/InboxEditor.js
import React from 'react';

const InboxEditor = ({ 
  isOpen, 
  onToggle, 
  onMarkAsRead, 
  onDelete, 
  onMarkAllAsRead, 
  selectedCount 
}) => {
  return (
    <>
      <div className="inbox-list__editor editor">
        <div 
          className="editor__btn" 
          onClick={onToggle}
          style={{ 
            display: 'block', 
            maskImage: 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-editor.svg?v=1760412521693")' 
          }}
        ></div>
      </div>

      {isOpen && (
        <div className="pop-wrap pop-editor">
          {selectedCount === 0 ? (
            <ul className="editor-menu">
              <li onClick={onToggle}>Edit</li>
              <li onClick={onMarkAllAsRead}>Read All</li>
              <li onClick={onToggle}>Cancel</li>
            </ul>
          ) : (
            <ul className="editor-check">
              <li onClick={onMarkAsRead}>Mark</li>
              <li onClick={onDelete}>Delete</li>
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default InboxEditor;