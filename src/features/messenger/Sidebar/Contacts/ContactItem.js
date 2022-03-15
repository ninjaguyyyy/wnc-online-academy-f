const MessengerContactItem = () => {
  return (
    <a href="#" className="filterMembers all online contact" data-toggle="list">
      <img
        className="avatar-md "
        src="/img/avatars/avatar-male-1.jpg"
        data-toggle="tooltip"
        data-placement="top"
        title="Janette"
        alt="avatar"
        width={70}
        height={70}
      />
      <div className="status">
        <i className="material-icons online">fiber_manual_record</i>
      </div>
      <div className="data ml-3">
        <h5>Michael Knudsen</h5>
        <p>Washington, USA</p>
      </div>
      <div className="person-add">
        <i className="material-icons">person</i>
      </div>
    </a>
  );
};

export default MessengerContactItem;
