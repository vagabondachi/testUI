import React from 'react';
import GroupList from './GroupList';

function DiscoverView() {
  return (
    <div id="discover-container">
      <div id="discover-content">
        <div id="discover-hero">
          <p>Find You Community on WeedleZ</p>
          <p>There's always a unique place for a unique being</p>
          <form className="nosubmit">
            <input
              className="nosubmit"
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
