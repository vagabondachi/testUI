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
        <SimpleBar style={{ height: '60%' }}>
          <ul>
            {groups.map((group) => (
              <li className="discover-container-items" key={group.id}>
                <img id="img-discover-cover" src={faker.image.cats()} />
                <img id="img-discover" src={faker.image.avatar()} />
                <div id="discover-item">{group.name}</div>
                <button
                  id="modalJoinGrp"
                  onClick={() => {
                    handleClick(group.id);
                    setOpenModal(true);
                  }}
                >
                  Join
                </button>
                <DiscoverModal
                  open={openModal}
                  onClose={() => setOpenModal(false)}
                />
              </li>
            ))}
          </ul>
        </SimpleBar>
      </div>
    </div>
  );
}
export default DiscoverView;
