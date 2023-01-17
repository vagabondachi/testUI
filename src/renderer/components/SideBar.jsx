import React from 'react';
import GroupList from './GroupList';
import GetRecentChats from './GetRecentChats';
import { useSelector } from 'react-redux';
import Settings from './SettingsView';

function SideBar() {
  /* Getting the state of the sidebar from the redux store. */
  const toggle = useSelector((state) => state.sidebar);

  return (
    <div className="sidebarcontainer">
      <div id="sidebar-content">
        {toggle == 'groups' && (
          <>
            <h1>Discover</h1>
            <GroupList />
          </>
        )}
        {toggle == 'chats' && (
          <>
            <GetRecentChats />
          </>
        )}
        {toggle == 'settings' && (
          <>
            <Settings />
          </>
        )}
      </div>
    </div>
  );
}

export default SideBar;
