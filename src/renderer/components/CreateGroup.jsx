import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

function CreateGroupForm() {
  const [groupName, setGroupName] = useState('');
  const db = firebase.firestore();

  const handleSubmit = (event) => {
    event.preventDefault();

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
  };

  return (
    <div id="myModal" className='modal'>
      <div className='modal-content'>
        <span class="close">&times;</span>
    <form onSubmit={handleSubmit}>
      <label>
        Group Name:
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
      </label>
      <button type="submit">Create Group</button>
    </form>
    </div>
    </div>
  );
}

export default CreateGroupForm;
