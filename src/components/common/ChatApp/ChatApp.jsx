import React, { useState, useRef, useEffect } from 'react';
import './ChatApp.css';

const ChatApp = () => {
  const [currentView, setCurrentView] = useState('contact'); // 'contact' or 'chat'
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [contactInfo, setContactInfo] = useState({
    name: '',
    phoneNumber: '',
    countryCode: '+880'
  });
  const [isComposerDisabled, setIsComposerDisabled] = useState(true);
  const messagesEndRef = useRef(null);

  // Initial bot message
  useEffect(() => {
    if (currentView === 'chat') {
      const initialMessage = {
        id: 1,
        type: 'bot',
        content: 'বাংলাদেশে স্বাগতম! অনুগ্রহ করে আপনার প্রশ্ন সিলেক্ট করুন:',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        actions: ['ডিপোজিট', 'উইথড্র', 'অ্যাকাউন্ট সমস্যা', 'গেম সমস্যা', 'বোনাস']
      };
      setMessages([initialMessage]);
      setIsComposerDisabled(false);
    }
  }, [currentView]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (contactInfo.name && contactInfo.phoneNumber) {
      setCurrentView('chat');
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: 'user',
        content: inputMessage,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
      };
      setMessages(prev => [...prev, newMessage]);
      setInputMessage('');

      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          type: 'bot',
          content: 'আপনার বার্তার জন্য ধন্যবাদ। আমাদের সাপোর্ট টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে।',
          timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const handleActionClick = (action) => {
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: action,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    };
    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response based on action
    setTimeout(() => {
      let botResponseContent = '';
      switch (action) {
        case 'ডিপোজিট':
          botResponseContent = 'ডিপোজিট সম্পর্কিত সাহায্যের জন্য, আমাদের ডিপোজিট গাইড দেখুন।';
          break;
        case 'উইথড্র':
          botResponseContent = 'উইথড্র প্রক্রিয়া সম্পর্কে বিস্তারিত তথ্য আমাদের উইথড্রাল সেকশনে available।';
          break;
        case 'অ্যাকাউন্ট সমস্যা':
          botResponseContent = 'অ্যাকাউন্ট সমস্যা সমাধানের জন্য, আমাদের সাপোর্ট টিম আপনার সাথে যোগাযোগ করবে।';
          break;
        case 'গেম সমস্যা':
          botResponseContent = 'গেম সম্পর্কিত কোনো সমস্যা হলে দয়া করে বিস্তারিত বলুন।';
          break;
        case 'বোনাস':
          botResponseContent = 'বোনাস সম্পর্কিত তথ্য আমাদের প্রোমোশন পেজে available।';
          break;
        default:
          botResponseContent = 'আপনার প্রশ্নের জন্য ধন্যবাদ। আমরা শীঘ্রই সাহায্য করব।';
      }

      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: botResponseContent,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="chat-app">
      {currentView === 'contact' ? (
        <ContactForm
          contactInfo={contactInfo}
          setContactInfo={setContactInfo}
          onSubmit={handleContactSubmit}
        />
      ) : (
        <ChatInterface
          messages={messages}
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          onSendMessage={handleSendMessage}
          onActionClick={handleActionClick}
          isComposerDisabled={isComposerDisabled}
          messagesEndRef={messagesEndRef}
        />
      )}
    </div>
  );
};

const ContactForm = ({ contactInfo, setContactInfo, onSubmit }) => {
  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="flex gap-3 items-center overflow-hidden chat-header-content">
          <div className="flex items-center gap-2 flex-1">
            <img 
              src="https://storage-crickex.cxgenie.app/files/1ecf5841b621fbe7a4e1f43cef420b44.jpg" 
              alt="Superbaji" 
              className="object-cover object-center rounded-full shrink-0 w-6 h-6"
            />
            <div className="truncate flex-1 overflow-hidden">Superbaji</div>
          </div>
          <div className="cursor-pointer fullscreen-btn">
            <span className="icon-maximize-4" style={{ fontSize: '20px', color: 'rgb(125, 130, 139)' }}></span>
          </div>
          <div className="cursor-pointer">
            <span className="icon-close" style={{ fontSize: '24px', color: 'rgb(92, 97, 105)' }}></span>
          </div>
        </div>
      </div>
      
      <div className="contact-information">
        <div className="ci-container">
          <p className="title">আপনাকে আরও ভাল সমর্থন করার জন্য আমাদের আপনার তথ্য দিন</p>
          <form className="form" onSubmit={onSubmit}>
            <div className="info-input">
              <label htmlFor="name">তোমার নাম *</label>
              <div className="flex flex-col">
                <input 
                  id="name"
                  type="text" 
                  className="input" 
                  placeholder="তোমার নাম টাইপ করুন"
                  value={contactInfo.name}
                  onChange={(e) => setContactInfo(prev => ({...prev, name: e.target.value}))}
                  required
                />
              </div>
            </div>
            
            <div className="info-input">
              <label htmlFor="phone_number">ফোন নম্বর *</label>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <div className="country-code-selector">
                    <span>+880</span>
                  </div>
                  <input 
                    id="phone_number"
                    type="tel" 
                    className="input flex-1 w-full" 
                    placeholder="ফোন নম্বর টাইপ করুন"
                    value={contactInfo.phoneNumber}
                    onChange={(e) => setContactInfo(prev => ({...prev, phoneNumber: e.target.value}))}
                    required
                  />
                </div>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="submit-info-btn"
              style={{ background: 'rgb(54, 77, 231)', opacity: 1 }}
            >
              চলো চ্যাট করি!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const ChatInterface = ({ 
  messages, 
  inputMessage, 
  setInputMessage, 
  onSendMessage, 
  onActionClick, 
  isComposerDisabled,
  messagesEndRef 
}) => {
  return (
    <div className="chat-container">
      <div className="chat_center">
        <div className="flex-1 overflow-hidden flex w-full">
          <div className="flex-1 flex flex-col">
            <div className="chat-header">
              <div className="flex gap-3 items-center overflow-hidden chat-header-content">
                <div className="flex items-center gap-2 flex-1">
                  <img 
                    src="https://storage-crickex.cxgenie.app/files/1ecf5841b621fbe7a4e1f43cef420b44.jpg" 
                    alt="Superbaji" 
                    className="object-cover object-center rounded-full shrink-0 w-6 h-6"
                  />
                  <div className="truncate flex-1 overflow-hidden">Superbaji</div>
                </div>
                <div className="cursor-pointer fullscreen-btn">
                  <span className="icon-maximize-4" style={{ fontSize: '20px', color: 'rgb(125, 130, 139)' }}></span>
                </div>
                <div className="cursor-pointer">
                  <span className="icon-close" style={{ fontSize: '24px', color: 'rgb(92, 97, 105)' }}></span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col">
              <div className="chat-content chat-list relative">
                <div className="messages-container">
                  {messages.map((message) => (
                    <div key={message.id} className="message-container">
                      <div className="message-avatar shrink-0">
                        <img 
                          src="https://storage-crickex.cxgenie.app/files/1ecf5841b621fbe7a4e1f43cef420b44.jpg" 
                          className="avatar" 
                          alt="avatar" 
                        />
                      </div>
                      <div className="flex flex-col flex-1 gap-1" style={{ alignItems: 'flex-start', width: '100%' }}>
                        <div className="message-bubble relative">
                          {message.type === 'bot' && <strong>Superbaji </strong>}
                          <p>{message.content}</p>
                          <div className="message-date">{message.timestamp}</div>
                          
                          <div className="_reaction_1wlfl_1 reaction _liked_1wlfl_27">
                            <div className="_icon_container_1wlfl_23 _showed_1wlfl_16">
                              <span className="icon-thumb-up" style={{ fontSize: '16px' }}></span>
                            </div>
                            <div className="_icon_container_1wlfl_23">
                              <span className="icon-thumb-down" style={{ fontSize: '16px' }}></span>
                            </div>
                          </div>
                          
                          <div className="message-tool _message_tool_zjrbj_1 _is_client_zjrbj_14">
                            <span className="icon-reply _tool_zjrbj_19 _blue_zjrbj_23" style={{ fontSize: '20px', color: 'rgb(125, 130, 139)' }}></span>
                          </div>
                        </div>
                        
                        <div className="message-date !text-[#a3a9b3] !opacity-100">
                          {message.timestamp}
                        </div>
                        
                        {message.actions && (
                          <div className="flex items-center flex-wrap gap-2 max-w-[80%]">
                            {message.actions.map((action, index) => (
                              <div 
                                key={index}
                                className="message-action max-w-[100%]"
                                style={{ overflowWrap: 'anywhere', lineHeight: '150%' }}
                                onClick={() => onActionClick(action)}
                              >
                                {action}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              <div className="composer-container">
                <div className="media-field">
                  <div className="upload-info">
                    <p style={{ color: 'grey', fontSize: '0.8rem', marginTop: '10px' }}>
                      Maximum 8 files and 20MB each file
                    </p>
                  </div>
                </div>
                
                <form className="chat-composer" onSubmit={onSendMessage}>
                  <div className="flex items-center gap-2">
                    <button type="button" className="cursor-not-allowed opacity-50" disabled>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.198 17.3819C11.4704 17.3819 10.7724 17.0936 10.257 16.58C9.74153 16.0664 9.45063 15.3695 9.44799 14.6419C9.44799 13.9119 9.73799 13.2119 10.258 12.7019L11.668 11.2919C11.958 11.0019 12.438 11.0019 12.728 11.2919C13.018 11.5819 13.018 12.0619 12.728 12.3519L11.318 13.7619C11.2012 13.8768 11.1084 14.0137 11.045 14.1648C10.9817 14.3159 10.9491 14.4781 10.9491 14.6419C10.9491 14.8057 10.9817 14.9679 11.045 15.119C11.1084 15.2701 11.2012 15.4071 11.318 15.5219C11.808 16.0119 12.598 16.0119 13.088 15.5219L15.308 13.3019C15.9042 12.6891 16.2351 11.8662 16.2292 11.0112C16.2233 10.1562 15.8811 9.33795 15.2765 8.73338C14.6719 8.12882 13.8537 7.78657 12.9987 7.78068C12.1437 7.77479 11.3208 8.10573 10.708 8.70191L8.28799 11.1219C8.03788 11.369 7.83931 11.6633 7.70379 11.9878C7.56827 12.3122 7.49848 12.6603 7.49848 13.0119C7.49848 13.3635 7.56827 13.7116 7.70379 14.036C7.83931 14.3605 8.03788 14.6548 8.28799 14.9019C8.57799 15.1919 8.57799 15.6719 8.28799 15.9619C7.99799 16.2519 7.51799 16.2519 7.22799 15.9619C6.83881 15.5739 6.53056 15.1124 6.32113 14.6043C6.11171 14.0961 6.00526 13.5515 6.00799 13.0019C6.00799 11.8819 6.43799 10.8319 7.22799 10.0419L9.64799 7.62191C10.5404 6.73328 11.7486 6.23438 13.008 6.23438C14.2674 6.23438 15.4755 6.73328 16.368 7.62191C17.2566 8.51436 17.7555 9.72249 17.7555 10.9819C17.7555 12.2413 17.2566 13.4495 16.368 14.3419L14.148 16.5619C13.608 17.1119 12.908 17.3819 12.198 17.3819Z" fill="#A3A9B3"></path>
                        <path d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z" fill="#A3A9B3"></path>
                      </svg>
                    </button>
                    
                    <div className="relative opacity-50">
                      <img className="cursor-not-allowed" src="/emoji-happy.svg" width="24" height="24" alt="emoji" />
                    </div>
                  </div>
                  
                  <input 
                    className={isComposerDisabled ? "opacity-50 cursor-not-allowed" : ""}
                    placeholder="কিছু... টাইপ করুন"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    disabled={isComposerDisabled}
                  />
                  
                  <div className="flex items-center gap-2">
                    <button 
                      type="submit"
                      disabled={isComposerDisabled || !inputMessage.trim()}
                      className={`rounded-lg overflow-hidden ${isComposerDisabled || !inputMessage.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="48" height="48" fill="white"></rect>
                        <path d="M31.0819 19.9282L21.0952 14.9349C14.3869 11.5749 11.6336 14.3282 14.9936 21.0366L16.0086 23.0666C16.3002 23.6616 16.3002 24.3499 16.0086 24.9449L14.9936 26.9632C11.6336 33.6716 14.3752 36.4249 21.0952 33.0649L31.0819 28.0716C35.5619 25.8316 35.5619 22.1682 31.0819 19.9282V19.9282ZM27.3136 24.8749H21.0136C20.5352 24.8749 20.1386 24.4782 20.1386 23.9999C20.1386 23.5216 20.5352 23.1249 21.0136 23.1249H27.3136C27.7919 23.1249 28.1886 23.5216 28.1886 23.9999C28.1886 24.4782 27.7919 24.8749 27.3136 24.8749Z" fill="#364DE7"></path>
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bottom_tabs shrink-0">
          <div className="tab_item">
            <div className="indicator" style={{ backgroundColor: 'rgb(54, 77, 231)' }}></div>
            <span className="icon-home" style={{ fontSize: '24px', color: 'rgb(163, 169, 179)' }}></span>
          </div>
          <div className="tab_item">
            <div className="indicator active" style={{ backgroundColor: 'rgb(54, 77, 231)' }}></div>
            <span className="icon-message-solid" style={{ fontSize: '24px', color: 'rgb(54, 77, 231)' }}></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;