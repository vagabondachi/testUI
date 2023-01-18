import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import store from '../store/store';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { faker } from '@faker-js/faker';
import DiscoverModal from './DiscoverModal';


function DiscoverView() {
    const [groups, setGroups] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const db = firebase.firestore();

  useEffect(() => {
    db.collection('conversations')
      .where('type', '==', 'group')
      .onSnapshot((snapshot) => {
        const newGroups = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .sort((a, b) => b.created_at - a.created_at);
        setGroups(newGroups);
      });
  }, []);

  const handleClick = (groupId) => {
    console.log(`Clicked on group ${groupId}`);
    store.dispatch({ type: 'SET_GROUP_ID', groupId: groupId });
  };

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
                    <button id="modalJoinGrp" onClick={() => { handleClick(group.id); setOpenModal(true); }}>
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
