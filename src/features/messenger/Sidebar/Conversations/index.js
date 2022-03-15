import MessengerConversationItem from './Conversation';

const MessengerConversationsTab = () => {
  return (
    <div id="discussions" className="tab-pane fade active show">
      <div className="search">
        <form className="form-inline position-relative">
          <input type="search" className="form-control" id="conversations" placeholder="Search for conversations..." />
          <button type="button" className="btn btn-link loop">
            <i className="material-icons">search</i>
          </button>
        </form>
        <button className="btn create" data-toggle="modal" data-target="#startnewchat">
          <i className="material-icons">create</i>
        </button>
      </div>
      <div className="list-group sort">
        <button className="btn filterDiscussionsBtn active show" data-toggle="list" data-filter="all">
          All
        </button>
        <button className="btn filterDiscussionsBtn" data-toggle="list" data-filter="read">
          Read
        </button>
        <button className="btn filterDiscussionsBtn" data-toggle="list" data-filter="unread">
          Unread
        </button>
      </div>
      <div className="discussions">
        <h1>Discussions</h1>
        <div className="list-group" id="chats" role="tablist">
          <MessengerConversationItem />
        </div>
      </div>
    </div>
  );
};

export default MessengerConversationsTab;
