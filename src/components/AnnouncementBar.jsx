import React from 'react';

const AnnouncementBar = () => {
  return (
    <div className="announcement-bar">
      <div className="announcement-marquee">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="announcement-item">
            <div className="announcement-dot"></div>
            <span>Sell Your Old Devices & Earn Instantly</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementBar;
