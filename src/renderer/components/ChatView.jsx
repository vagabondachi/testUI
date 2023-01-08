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

      <div className="footer">
        <form onSubmit={handleSubmit}>
          <div className="form-footer-container">
            <div className="textarea-container">
              <textarea
                name="text"
                rows="14"
                wrap="soft"
                placeholder="Write Message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            {/* <div className='fieldicon-area'>
      <div className='fieldicon'>
        <button className="footer-btn" type="submit">
          <i className="ri-send-plane-fill"></i>
          </button>
          </div>

          </div> */}
            <div className="fieldicon">
              <button className="footer-btn" type="submit">
                <i className="ri-mic-2-fill"></i>
              </button>
            </div>
            <div className="btn-footer-container">
              <button className="footer-icon-btn" type="submit">
                <i className="ri-send-plane-fill"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Chat;
