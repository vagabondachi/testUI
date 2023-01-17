import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import store from '../store/store';
import CreateGroup from './CreateGroup';

function GroupList() {
  const [groups, setGroups] = useState([]);

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
    <ul>
      <b> Recently Joined: </b>
      {groups.map((group) => (
        <li key={group.id} onClick={() => handleClick(group.id)}>
          {group.name}
        </li>
      ))}
    </ul>
  );
}

export default GroupList;
