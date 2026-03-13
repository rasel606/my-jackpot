// components/Footer.js
import React, { useState } from 'react';

const Footer = () => {
  const [expanded, setExpanded] = useState(false);

  const paymentMethods = [
    { id: 1, image: "https://img.s628b.com/sb/h5/assets/images/footer/color-white/pay16.png", width: 122, height: 45 },
    { id: 2, image: "https://img.s628b.com/sb/h5/assets/images/footer/color-white/pay17.png", width: 100, height: 30 },
    { id: 3, image: "https://img.s628b.com/sb/h5/assets/images/footer/color-white/pay22.png", width: 68, height: 30 },
    { id: 4, image: "https://img.s628b.com/sb/h5/assets/images/footer/color-white/pay33.png", width: 46, height: 30 },
    { id: 5, image: "https://img.s628b.com/sb/h5/assets/images/footer/color-white/pay34.png", width: 68, height: 30 },
    { id: 6, image: "https://img.s628b.com/sb/h5/assets/images/footer/color-white/pay45.png", width: 87, height: 30 },
    { id: 7, image: "https://img.s628b.com/sb/h5/assets/images/footer/color-white/pay46.png", width: 78, height: 30 },
    { id: 8, image: "https://img.s628b.com/sb/h5/assets/images/footer/color-white/pay59.png", width: 122, height: 45 },
    { id: 9, image: "https://img.s628b.com/sb/h5/assets/images/footer/color-white/pay60.png", width: 153, height: 45 },
    { id: 10, image: "https://img.s628b.com/sb/h5/assets/images/footer/color-white/pay61.png", width: 39, height: 39 }
  ];

  const footerLinks = [
    { text: "About Us", href: "https://sbajisuper.link/bd-en/about-us" },
    { text: "Contact Us", href: "https://sbajisuper.link/bd-en/contact-us" },
    { text: "Privacy Policy", href: "https://sbajisuper.link/bd-en/privacy-policy" },
    { text: "Terms & Conditions", href: "https://sbajisuper.link/bd-en/terms-and-conditions" },
    { text: "Rules and Regulations", href: "https://sbajisuper.link/bd-en/rules-and-regulations" },
    { text: "Responsible Gaming", href: "https://sbajisuper.link/bd-en/responsible-gaming" },
    { text: "Frequently Asked Questions", href: "https://sbajisuper.link/bd-en/guide-book" },
    { text: "Affiliate", href: "https://sbajisuper.link/bd-en/affiliate-partner" }
  ];

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="pay">
          <h2>Payment Methods</h2>
          <ul>
            {paymentMethods.map(method => (
              <li key={method.id}>
                <img 
                  alt={`pay${method.id}`} 
                  src={method.image} 
                  loading="lazy" 
                  width={method.width} 
                  height={method.height}
                  style={{ aspectRatio: `${method.width} / ${method.height}` }}
                />
              </li>
            ))}
          </ul>
        </div>
        
        <div className="sponsor-ambassadors">
          <div className="official-partner">
            <h2>Official Partner</h2>
            <ul>
              <li>
                <a target="_blank" href="https://sbajisuper.link/bd-en/heyvip">
                  <img 
                    alt="heyvip" 
                    src="https://img.s628b.com/sb/h5/assets/images/footer/color-black/official-partner-heyvip.png" 
                    loading="lazy" 
                    width={498} 
                    height={150}
                    style={{ aspectRatio: "498 / 150" }}
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-logo-wrap">
        <div className="link-wrap">
          <ul>
            {footerLinks.map((link, index) => (
              <li key={index}>
                <a href={link.href} target="_blank">{link.text}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="footer-collapse">
        <div className="footer-collapse__title">
          About SuperBaji – A Trusted Online Betting Platform for Bangladesh
        </div>
        
        <div className="footer-collapse__content" style={{ display: expanded ? 'block' : 'none' }}>
          <p>Superbaji, a major online betting platform and premium cricket exchange, has quickly gained popularity in Bangladesh...</p>
          {/* Full content would go here */}
        </div>
        
        <div className="footer-collapse__btn" onClick={() => setExpanded(!expanded)}>
          Read More
          <div className="footer-collapse__btn-arrow" style={{ 
            maskImage: `url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-arrow-type09.svg")`,
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)'
          }}></div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="logo" style={{ 
          backgroundImage: `url("https://img.s628b.com/sb/h5/assets/images/logo-02.png")` 
        }}></div>
        
        <div className="text">
          <div className="title">Best Quality Platform</div>
          <p>© 2025 SuperBaji Copyrights. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;