import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import store from '../store/store';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [groupName, setGroupName] = useState('');
  const db = firebase.firestore();

  const state = store.getState();
  const groupId = state.groupId;

  /* Listening to the database and updating the messages array. */
  useEffect(() => {
    db.collection('conversations')
      .doc(groupId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setGroupName(doc.data().name);
        }
      });

    db.collection('conversations')
      .doc(groupId)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) => {
        const newMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(newMessages);
      });
  }, [groupId]);

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
    <>
      <h1>Conversation Name: {groupName}</h1>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            {message.sender}: {message.text}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <label>
          Message:
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <button type="submit">Send Message</button>
      </form>
    </>
  );
}

export default Chat;
