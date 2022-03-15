import React from 'react';
import ChatArea from './Chat';

export default function ConversationDetail() {
  return (
    <div className="main">
      <div className="tab-content" id="nav-tabContent">
        <div
          className="babble tab-pane fade active show"
          id="list-chat"
          role="tabpanel"
          aria-labelledby="list-chat-list"
        >
          <ChatArea />
        </div>
      </div>
    </div>
  );
}
