import React from 'react';

const Sidebar = () => {
    return(
    <div className="people-list" id="people-list">
      <div className="search">
        <input type="text" placeholder="search" />
        <i className="fa fa-search"></i>
      </div>
      <ul className="list">
        <li className="clearfix">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
          <div className="about">
            <div className="name">Vincent Porter</div>
            <div className="status">
              <i className="fa fa-circle online"></i> online
            </div>
          </div>
        </li>        
        
        <li className="clearfix">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_09.jpg" alt="avatar" />
          <div className="about">
            <div className="name">Dean Henry</div>
            <div className="status">
              <i className="fa fa-circle offline"></i> offline since Oct 28
            </div>
          </div>
        </li>
        
        <li className="clearfix">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_10.jpg" alt="avatar" />
          <div className="about">
            <div className="name">Peyton Mckinney</div>
            <div className="status">
              <i className="fa fa-circle online"></i> online
            </div>
          </div>
        </li>
      </ul>
    </div>
    )
}

export default Sidebar;