import React from 'react';
import GetRecentChats from './GetRecentChats';
import { useSelector } from 'react-redux';
import Settings from './SettingsView';
import DiscoverCategories from './DiscoverCategories';

function SideBar() {
  /* Getting the state of the sidebar from the redux store. */
  const toggle = useSelector((state) => state.sidebar);

  return (
    <div className="sidebarcontainer">
      <div id="sidebar-content">
        {toggle == 'groups' && (
          <>
            <h1 id="sidebar-header">Discover</h1>
            <DiscoverCategories />
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
