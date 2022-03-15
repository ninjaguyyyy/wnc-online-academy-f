import React from 'react';

export default function YouMessage() {
  return (
    <>
      <div className="message pt-3" style={{ alignItems: 'center' }}>
        <img className="avatar-xxl" src="/img/avatars/avatar-female-5.jpg" alt="avatar" width={40} height={40} />
        <div className="text-main ml-3" style={{ transform: 'translateY(-10px)' }}>
          <span className="ml-1">09:46 AM</span>
          <div className="text-group mb-0">
            <div className="text">
              <p>We ve got some killer ideas kicking about already.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
