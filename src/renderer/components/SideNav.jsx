import React from 'react';
import store from '../store/store';
import Logout from './Logout';
import { faker } from '@faker-js/faker';

function SideNav() {
  return (
    <div className="sidenavcontainer">
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
            <span> Direct Message</span>
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
            <i className="ri-add-line"></i>
            <span> Add a channel </span>
          </button>
        </div>
        <div className="btn-container">
          <button
            className="nav-btn"
            onClick={() => {
              console.log('Clicked on Groups');
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
        <div className="circle">
          <img height="54" width="53" src={faker.image.avatar()} />
        </div>

        <div className="wrapper">
          <div className="content">
            <ul className="menu">
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
                <span>Settings</span>
              </li>
              <li className="item">
                <i className="ri-logout-box-r-fill"></i>
                <Logout />
              </li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
