import MessengerChatsTab from './Conversations';
import { useSelector } from 'react-redux';
import MessengerContactsTab from './Contacts';
import { TabOptions } from 'helpers/constants';

const Sidebar = () => {
  const tab = useSelector((state) => state.messenger.tab);
  console.log('🚀 ~ file: index.js ~ line 8 ~ Sidebar ~ tab', tab);

  return (
    <div className="sidebar" id="sidebar">
      <div className="container">
        <div className="col-md-12">
          <div className="tab-content">
            {tab === TabOptions.Contacts && <MessengerContactsTab />}
            {tab === TabOptions.Conversations && <MessengerChatsTab />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
