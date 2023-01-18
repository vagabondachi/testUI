import React from 'react';
import { useSelector } from 'react-redux';
import Chat from './ChatView';
import DiscoverView from './DiscoverView';

function ContentView() {
  /* Getting the state of the sidebar from the redux store. */
  const toggle = useSelector((state) => state.sidebar);

  return (
    <div className="chatcontainer">
      <div id="chat-content">
        {toggle == 'groups' && (
          <>
            <DiscoverView />
          </>
        )}
        {toggle == 'chats' && (
          <>
            <Chat />
          </>
        )}
      </div>
    </div>
  );
}

export default ContentView;
