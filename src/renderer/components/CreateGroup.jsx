import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useSelector } from 'react-redux';
import store from '../store/store';

function CreateGroupForm() {
  const [groupName, setGroupName] = useState('');
  const db = firebase.firestore();
  const userId = useSelector((state) => state.user.uid);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (groupName.length > 0) {
      db.collection('conversations')
        .add({
          name: groupName,
          created_at: firebase.firestore.FieldValue.serverTimestamp(),
          type: 'group',
          latest_time_message: firebase.firestore.FieldValue.serverTimestamp(),
          members: [userId],
        })

      db.collection('conversations')
        .add({
          name: groupName,
          created_at: firebase.firestore.FieldValue.serverTimestamp(),
          type: 'group',
          latest_time_message: firebase.firestore.FieldValue.serverTimestamp(),
          members: [],
        })
        .then(function () {
          console.log('Group created successfully');
        })
        .then(function(docRef) {
  // add the group to the recent chats list
  db.collection('recent_chats')
    .doc(docRef.id)
    .set({
      conversation_id: docRef.id,
      type: 'group',
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    });
  // display a welcome message in the group
  db.collection('conversations')
    .doc(docRef.id)
    .collection('messages')
    .add({
      text: 'Welcome to the group!',
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
      sender: 'admin'
    });
  console.log('Group created successfully and added to recent chats');
})
        .catch(function (error) {
          console.error('Error adding group: ', error);
        });
    } else {
      console.log('Please enter a group name');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div id="addChatPoPBox-container">
        <h1 id="poph1">Create a Channel</h1>
        <label>
          Channel Name
          <input
            id="create-group-input"
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="e.g Sunny Squad"
          />
        </label>
        <button id="create-group-btn" type="submit">
          Create Channel
        </button>
      </div>
    </form>
  );
}

export default CreateGroupForm;
