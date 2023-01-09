import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import store from '../store/store';
import SendChatMessage from './SendChatMessage';
import translateIcon from '../../../assets/translate.png';

function Chat() {
  const [messages, setMessages] = useState([]);
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

  const handleTranslate = (id) => {
    //this would change the message text to translated_message from the document id provided
  };

  return (
    <div className="chatcontainer">
      <div className="header">
        <div className="title">
          <h1> {groupName}</h1>
        </div>
      </div>

      <div className="message-container">
        <ul>
          {messages.map((message) => (
            <li key={message.id}>
              {message.sender}: {message.text}
              <img
                style={{
                  height: '20px',
                  margin: '0 5px 0 0',
                }}
                src={translateIcon}
                onClick={() => {
                  handleTranslate(message.id);
                }}
              />
            </li>
          ))}
        </ul>
      </div>
      <SendChatMessage />
    </div>
  );
}

export default Chat;
