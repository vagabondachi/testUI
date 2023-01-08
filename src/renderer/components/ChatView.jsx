import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import store from '../store/store';
import SendChatMessage from './SendChatMessage';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [groupName, setGroupName] = useState('');
  const db = firebase.firestore();

  const state = store.getState();
  const groupId = state.groupId;
  const translate_to_code = state.languageTranslateTo;

  const translate = async (text) => {
    const resp = await fetch('http://localhost:5000/translate', {
      method: 'POST',
      body: JSON.stringify({ text }),
      headers: {
        'X-translate-to-code': translate_to_code,
      },
    });
    const data = await resp.json();
    return data.message;
  };

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

  return (
    <div className="chatcontainer">
      <div className="header">
        <div className="title">
          <h1> {groupName}</h1>
        </div>
      </div>

      <div className="message-area">
        <ul>
          {messages.map((message) => (
            <li key={message.id}>
              {message.sender}: {message.text}
            </li>
          ))}
        </ul>
      </div>

      <SendChatMessage />
    </div>
  );
}

export default Chat;
