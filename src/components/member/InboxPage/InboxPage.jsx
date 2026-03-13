import React, { useState, useEffect } from "react";
import MessageItem from "./MessageItem";

const Inbox = () => {
  const [messages, setMessages] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState(new Set());
  const [showEditorMenu, setShowEditorMenu] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Sample data - you can replace this with actual API data
  const sampleMessages = [
    {
      date: "2025/10/26",
      timeZone: "GMT+6",
      items: [
        {
          id: "2694406801",
          title: "Daily Login",
          time: "10:40:31",
          text: "You have received 4 free spins on PP games with the Copper/Bronze দৈনিক লগইন PP ফ্রি স্পিন ! Use them before they expire.",
          read: false,
        },
      ],
    },
    {
      date: "2025/10/25",
      timeZone: "GMT+6",
      items: [
        {
          id: "2692094900",
          title: "🎉 JILI Tournament যোগ দিন এবং খেলুন! 🎉",
          time: "18:28:04",
          text: "📅 ২৬শে আগস্ট থেকে ২৮শে অক্টোবর পর্যন্ত প্রতিদিন অ",
          read: true,
        },
        {
          id: "2692030387",
          title: "🚨 একেবারে নতুন ক্যাসিনো গেমটি লাইভ 🚨",
          time: "18:27:11",
          text: '🎲"Mega Roulette 3000" প্র্যাগম্যাটিক প্লে 🚨 💯 ন',
          read: false,
        },
        {
          id: "2691964491",
          title: "💎 ডিপোজিটে ৪% অতিরিক্ত + বিনামূল্যে JILI স্পিন পান! 🎡",
          time: "18:25:18",
          text: "🚀 আরও ডিপোজিট মানে আরও খেলা! 🎲 বিনামূল্যে Jili স",
          read: false,
        },
      ],
    },
    {
      date: "2025/10/24",
      timeZone: "GMT+6",
      items: [
        {
          id: "2686875038",
          title: "💰 এখনই খেলুন এবং রিবেট উপার্জন করুন! 🎉",
          time: "18:46:37",
          text: "🎰স্লট: ১.৫৩% রিয়েল-টাইম বোনাস 💎 🃏 ক্যাসিনো: ১.",
          read: false,
        },
        {
          id: "2686809418",
          title: "💎 HEYVIP দৈনিক পুরষ্কার — ক্যাশব্যাক সময়! 💎",
          time: "18:45:08",
          text: "🎯 সকল এক্সক্লুসিভ গেমে ১৫% আনলিমিটেড ক্যাশব্যাক প",
          read: false,
        },
      ],
    },
  ];

  useEffect(() => {
    setMessages(sampleMessages);
  }, []);

  const toggleEditorMenu = () => {
    setShowEditorMenu(!showEditorMenu);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setShowEditorMenu(false);
  };

  const handleReadAll = () => {
    const updatedMessages = messages.map((dateGroup) => ({
      ...dateGroup,
      items: dateGroup.items.map((item) => ({ ...item, read: true })),
    }));
    setMessages(updatedMessages);
    setShowEditorMenu(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedMessages(new Set());
    setShowEditorMenu(false);
  };

  const toggleSelectMessage = (messageId) => {
    const newSelected = new Set(selectedMessages);
    if (newSelected.has(messageId)) {
      newSelected.delete(messageId);
    } else {
      newSelected.add(messageId);
    }
    setSelectedMessages(newSelected);
  };

  const handleMark = () => {
    const updatedMessages = messages.map((dateGroup) => ({
      ...dateGroup,
      items: dateGroup.items.map((item) =>
        selectedMessages.has(item.id) ? { ...item, read: true } : item
      ),
    }));
    setMessages(updatedMessages);
    setSelectedMessages(new Set());
    setIsEditing(false);
  };

  const handleDelete = () => {
    const updatedMessages = messages
      .map((dateGroup) => ({
        ...dateGroup,
        items: dateGroup.items.filter((item) => !selectedMessages.has(item.id)),
      }))
      .filter((dateGroup) => dateGroup.items.length > 0);

    setMessages(updatedMessages);
    setSelectedMessages(new Set());
    setIsEditing(false);
  };

  const selectAllMessages = () => {
    const allMessageIds = messages.flatMap((dateGroup) =>
      dateGroup.items.map((item) => item.id)
    );
    setSelectedMessages(new Set(allMessageIds));
  };

  const deselectAllMessages = () => {
    setSelectedMessages(new Set());
  };

  return (
    <>
      <div className="inner-box">
        <div className="inbox-list__editor editor">
          <div
            className="editor__btn"
            onClick={toggleEditorMenu}
            style={{
              display: "block",
              maskImage:
                'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-editor.svg?v=1761024116679")',
            }}
          ></div>
        </div>

        <div className="popup-page-main__content">
          {messages.map((dateGroup, index) => (
            <div
              key={index}
              className={`list list-message ${
                isEditing ? "editor-active" : ""
              }`}
            >
              <div className="date-title">
                <div className="date">
                  <span
                    className="item-icon"
                    style={{
                      maskImage:
                        'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-calendar-type02.svg?v=1761024116679")',
                    }}
                  ></span>
                  {dateGroup.date}
                </div>
                <div className="time-zone">{dateGroup.timeZone}</div>
              </div>
              <div className="list-content">
                {dateGroup.items.map((item) => (
                  <ul key={item.id} onClick={() => setShowDetails(item)}>
                    <li className={`message-item ${item.read ? "read" : ""}`}>
                      {isEditing && (
                        <div
                          className="chose-btn"
                          onClick={() => toggleSelectMessage(item.id)}
                          style={{
                            maskImage: selectedMessages.has(item.id)
                              ? 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-checked-type04.svg?v=1761024116679")'
                              : 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-check-type04.svg?v=1761024116679")',
                          }}
                        ></div>
                      )}
                      <div className="icon">
                        <img
                          alt="icon-speaker"
                          src="https://img.s628b.com/sb/h5/assets/images/icon-set/icon-speaker.svg?v=1761024116679&source=mcdsrc"
                          loading="lazy"
                        />
                      </div>
                      <div className="content-wrap">
                        <div className="title">
                          <span>{item.title}</span>
                          <div className="msg-time">{item.time}</div>
                        </div>
                        <div className="text">{item.text}</div>
                      </div>
                    </li>
                  </ul>
                ))}
              </div>
            </div>
          ))}
        </div>

        {showEditorMenu && (
          <div className="pop-wrap pop-editor">
            <ul className="editor-menu show">
              <li onClick={handleEdit}>Edit</li>
              <li onClick={handleReadAll}>Read All</li>
              <li onClick={handleCancel}>Cancel</li>
            </ul>
          </div>
        )}

        {isEditing && (
          <div className="pop-wrap pop-editor">
            <ul className="editor-check">
              <li onClick={selectAllMessages}>Select All</li>
              <li onClick={deselectAllMessages}>Deselect All</li>
              <li onClick={handleMark}>Mark</li>
              <li onClick={handleDelete}>Delete</li>
              <li onClick={handleCancel}>Cancel</li>
            </ul>
          </div>
        )}

        {showEditorMenu && (
          <div
            className="pop-bg"
            onClick={() => setShowEditorMenu(false)}
          ></div>
        )}
      </div>
      <MessageItem
        show={!!showDetails}
        onClose={() => setShowDetails(null)}
        title={showDetails?.title || ""}
        content={showDetails?.fullContent || showDetails?.text || ""}
      />
    </>
  );
};

export default Inbox;
