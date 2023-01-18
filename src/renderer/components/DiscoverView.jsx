import React from 'react';
import GroupList from './GroupList';

function DiscoverView() {
  return (
    <div id="discover-container">
      <div id="discover-content">
        <div id="discover-hero">
          <header id="discoverHeader">Find You Community on WeedleZ</header>
          <p id="discoverTagline">
            There's always a unique place for a unique being
          </p>
          <form className="discover">
            <input
              className="discover"
              type="search"
              placeholder="Find group..."
            />
          </form>
        </div>
        <GroupList></GroupList>
      </div>
    </div>
  );
}
export default DiscoverView;
