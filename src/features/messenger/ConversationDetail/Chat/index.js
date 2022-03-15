import React from 'react';
import YouMessage from './YouMessage';
import MeMessage from './MeMessage';

export default function ChatArea() {
  return (
    <div className="chat" id="chat1">
      <div className="top">
        <div className="container">
          <div className="col-md-12">
            <div className="inside">
              <a href="#">
                <img
                  className="avatar-xxl"
                  src="/img/avatars/avatar-female-5.jpg"
                  alt="avatar"
                  width={40}
                  height={40}
                />
              </a>
              <div className="status">
                <i className="material-icons online">fiber_manual_record</i>
              </div>
              <div className="data ml-2">
                <h5>
                  <a href="#">Keith Morris</a>
                </h5>
                <span>Active now</span>
              </div>
              <button className="btn connect d-md-block d-none">
                <i className="material-icons md-30">phone_in_talk</i>
              </button>
              <button className="btn connect d-md-block d-none">
                <i className="material-icons md-36">videocam</i>
              </button>
              <button className="btn d-md-block d-none">
                <i className="material-icons md-30">info</i>
              </button>
              <div className="dropdown">
                <button className="btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="material-icons md-30">more_vert</i>
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                  <button className="dropdown-item connect">
                    <i className="material-icons">phone_in_talk</i>Voice Call
                  </button>
                  <button className="dropdown-item connect">
                    <i className="material-icons">videocam</i>Video Call
                  </button>
                  <hr />
                  <button className="dropdown-item">
                    <i className="material-icons">clear</i>Clear History
                  </button>
                  <button className="dropdown-item">
                    <i className="material-icons">block</i>Block Contact
                  </button>
                  <button className="dropdown-item">
                    <i className="material-icons">delete</i>Delete Contact
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content" id="content">
        <div className="container">
          <div className="col-md-12">
            <div className="date">
              <hr />
              <span>Yesterday</span>
              <hr />
            </div>
            <YouMessage />
            <MeMessage />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="col-md-12">
          <div className="bottom">
            <form className="position-relative w-100">
              <textarea className="form-control" placeholder="Start typing for reply..." rows={1} defaultValue={''} />
              <button className="btn emoticons">
                <i className="material-icons">insert_emoticon</i>
              </button>
              <button type="submit" className="btn send">
                <i className="material-icons">send</i>
              </button>
            </form>
            <label>
              <input type="file" />
              <span className="btn attach d-sm-block d-none">
                <i className="material-icons">attach_file</i>
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
