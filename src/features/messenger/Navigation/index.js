import { useSelector, useDispatch } from 'react-redux';
import { changeTab } from '../../../store/messengerSlice';
import { TabOptions } from 'helpers/constants';

const MessengerNavigation = () => {
  const dispatch = useDispatch();
  const tab = useSelector((state) => state.messenger.tab);

  const setClassIcon = (desireTab) => (desireTab === tab ? 'material-icons active' : 'material-icons');

  return (
    <div className="navigation">
      <div className="container">
        <div className="inside">
          <div className="nav nav-tab menu">
            <button
              className="btn"
              style={{
                height: '120px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}
            >
              <img
                className="avatar-xl w-50"
                src="/img/avatars/avatar-male-1.jpg"
                alt="avatar"
                width={100}
                height={100}
              />
            </button>
            <a href="#!" data-toggle="tab" onClick={() => dispatch(changeTab(TabOptions.Contacts))}>
              <i className={setClassIcon(TabOptions.Contacts)}>account_circle</i>
            </a>
            <a href="#!" data-toggle="tab" onClick={() => dispatch(changeTab(TabOptions.Conversations))}>
              <i className={setClassIcon(TabOptions.Conversations)}>chat_bubble_outline</i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessengerNavigation;
