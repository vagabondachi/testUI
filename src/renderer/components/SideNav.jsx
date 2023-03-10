import React, { useState } from 'react';
import store from '../store/store';
import Logout from './Logout';
import { faker } from '@faker-js/faker';

function SideNav() {
  const [settings, showSettings] = useState(false);
  return (
    <div className="sidenavcontainer">
      <div id="sidenavcontents">
        <div className="btn-group">
          <div className="btn-container">
            <button
              className="nav-btn"
              onClick={() => {
                store.dispatch({
                  type: 'SET_SIDEBAR_VIEW',
                  sidebar: 'chats',
                });
              }}
            >
              <div className="sideborder"></div>
              <i className="ri-question-answer-fill"></i>
              <span> Team Message</span>
            </button>
          </div>

          <div className="btn-container">
            <button
              className="nav-btn"
              onClick={() => {
                store.dispatch({
                  type: 'SET_SIDEBAR_VIEW',
                  sidebar: 'groups',
                });
              }}
            >
              <div className="sideborder"></div>
              <i className="ri-compass-3-fill"></i>
              <span> Explore public channel </span>
            </button>
          </div>
        </div>

        <div className="btn-container-avatar">
          <div
            className="circle"
            onClick={() => {
              showSettings(!settings);
            }}
          >
            <img src={faker.image.avatar()} />
          </div>

          <ul className={settings ? 'menu shown' : 'menu hidden'}>
            <li
              className="item"
              onClick={() => {
                store.dispatch({
                  type: 'SET_SIDEBAR_VIEW',
                  sidebar: 'settings',
                });
              }}
            >
              <i className="ri-settings-4-fill"></i>
              <p id="item-category">Settings</p>
            </li>
            <li className="item" id="topborderdivider">
              <i className="ri-logout-box-r-fill"></i>
              <Logout />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
