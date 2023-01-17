import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

function CreateGroupForm() {
  const [groupName, setGroupName] = useState('');
  const db = firebase.firestore();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (groupName.length > 0) {
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
        .catch(function (error) {
          console.error('Error adding group: ', error);
        });
    } else {
      console.log('Please enter a group name');
    }
  };

  return (
  <form onSubmit={handleSubmit}>
    <div id='addChatPoPBox-container'>   
      <h1>Create a Channel</h1>     
      <label>Channel Name<input id="create-group" type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder="e.g Sunny Squad"/></label>
      <button id="create-group" type="submit">Create Channel</button>
    </div>     
  </form>
  );
}

export default CreateGroupForm;
