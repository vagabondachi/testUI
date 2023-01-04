import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

function PrivateMessage({ sender, receiver }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const db = firebase.firestore();

  useEffect(() => {
    const unsubscribe = db
      .collection('conversations')
      .where('type', '==', 'private')
      .where('participants', 'array-contains', sender)
      .onSnapshot((conversations) => {
        conversations.forEach((conversation) => {
          if (conversation.data().participants.includes(receiver)) {
            console.log(`Messages in conversation between user1 and user2:`);

            db.collection('conversations')
              .doc(conversation.id)
              .collection('messages')
              .orderBy('timestamp')
              .onSnapshot((messages) => {
                let messageArray = [];
                messages.forEach((message) => {
                  messageArray.push(message.data());
                });
                setMessages(messageArray);
              });
          }
        });
      });

    return unsubscribe;
  }, [sender, receiver]);

  const handleSubmit = (event) => {
    event.preventDefault();

    db.collection('conversations')
      .where('type', '==', 'private')
      .where('participants', 'array-contains', sender)
      .get()
      .then((conversations) => {
        let foundConversation = false;
        conversations.forEach((conversation) => {
          if (conversation.data().participants.includes(receiver)) {
            foundConversation = true;
            db.collection('conversations')
              .doc(conversation.id)
              .collection('messages')
              .add({
                sender: sender,
                message: inputMessage,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              });

            db.collection('conversations')
              .doc(conversation.id)
              .update({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              })
              .then(() => {
                console.log('Conversation timestamp updated.');
              });
          }
        });
        if (!foundConversation) {
          // Create new conversation
          db.collection('conversations')
            .add({
              type: 'private',
              participants: [sender, receiver],
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then((ref) => {
              console.log(`Private conversation created with ID: ${ref.id}`);
              db.collection('conversations')
                .doc(ref.id)
                .collection('messages')
                .add({
                  sender: sender,
                  message: inputMessage,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                });

              db.collection('conversations')
                .doc(ref.id)
                .update({
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                })
                .then(() => {
                  console.log('Conversation timestamp updated.');
                });
            });
        }
      });

    setInputMessage('');
  };

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>
          {message.sender === sender ? 'You: ' : 'Other: '}
          {message.message}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          value={inputMessage}
          onChange={(event) => setInputMessage(event.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default PrivateMessage;
