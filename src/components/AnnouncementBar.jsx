import React from 'react';
import { useAuth } from '../context/AuthContext';

const AnnouncementBar = () => {
  const { isAdmin } = useAuth();

  return (
    <div className="announcement-bar">
      <div className="announcement-marquee">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="announcement-item">
            <div className="announcement-dot"></div>
            <span>{isAdmin ? 'Manage User Sell Requests Instantly' : 'Sell Your Old Devices & Earn Instantly'}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementBar;
