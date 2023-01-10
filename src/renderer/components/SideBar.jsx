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
      {toggle == 'groups' && (
        <>
          <h1>Discover</h1>
          <GroupList />
        </>
      )}
      {toggle == 'chats' && (
        <div className="containerchats">
          <form class="nosubmit">
            <input class="nosubmit" type="search" placeholder="Find group..." />
          </form>
          <GetRecentChats />
        </div>
      )}
      {toggle == 'settings' && (
        <>
          <h1>Settings</h1>
          <Settings />
        </>
      )}
    </div>
  );
}

export default SideBar;
