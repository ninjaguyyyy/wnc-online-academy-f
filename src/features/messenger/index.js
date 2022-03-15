import React from 'react';
import ConversationDetail from './ConversationDetail';
import MessengerNavigation from './Navigation';
import Sidebar from './Sidebar';
import './index.css';

export default function Messenger() {
  return (
    <main className="messenger">
      <div className="layout">
        <MessengerNavigation />
        <Sidebar />
        <ConversationDetail />
      </div>
    </main>
  );
}
