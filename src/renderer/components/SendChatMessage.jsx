import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import RecordRTC from 'recordrtc';
import store from '../store/store';
const SendChatMessage = () => {
  const [message, setMessage] = useState('');
  const db = firebase.firestore();
  const state = store.getState();
  const groupId = state.groupId;
  /**
   * When the user submits the form, the message is added to the database and the user is added to the
   * members array.
   */


  const handleSubmit = (event) => {
    event.preventDefault();

    db.collection('conversations')
      .doc(groupId)
      .collection('messages')
      .add({
        sender: firebase.auth().currentUser.displayName,
        text: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function () {
        console.log('Message sent successfully');
        setMessage('');
      })
      .catch(function (error) {
        console.error('Error sending message: ', error);
      });
    db.collection('conversations')
      .doc(groupId)
      .update({
        members: firebase.firestore.FieldValue.arrayUnion(
          firebase.auth().currentUser.uid
        ),
        latest_time_message: firebase.firestore.FieldValue.serverTimestamp(),
      });
  };


  return (
    <div className="footer">
      <form onSubmit={handleSubmit}>
        <div className="form-footer-container">
          <div className="textarea-container">
            <input
              name="text"
              placeholder="Write Message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div className="btn-footer-container">
            <button className="footer-icon-btn" type="submit">
              <i className="ri-send-plane-fill"></i>
            </button>
          </div>
        </div>
      </form>

      <div className="fieldicon">
            <button className="footer-btn">
              <i className="ri-mic-2-fill"></i>
            </button>
          </div>
    </div>
  );
};

export default SendChatMessage;
