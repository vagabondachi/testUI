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
  const translate_to_code = state.languageTranslateTo;

  const translate = async (text) => {
    const resp = await fetch(
      'https://jellyfish-app-4424e.ondigitalocean.app/translate',
      {
        method: 'POST',
        body: JSON.stringify({ text }),
        headers: {
          'X-translate-to-code': translate_to_code,
        },
      }
    );
    const data = await resp.json();
    return data.message;
  };

  /**
   * When the user submits the form, the message is added to the database and the user is added to the
   * members array.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Add the message to the chat before the translation happens
    db.collection('conversations')
      .doc(groupId)
      .collection('messages')
      .add({
        sender: firebase.auth().currentUser.displayName,
        text: message,
        translated_text: '', // Set the translated text to an empty string initially
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

    // Translate the message in the background and update the translated text in the database
    const translatedText = await translate(message);
    db.collection('conversations')
      .doc(groupId)
      .collection('messages')
      .where('text', '==', message)
      .where('sender', '==', firebase.auth().currentUser.displayName)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.update({
            translated_text: translatedText,
          });
        });
      })
      .catch(function (error) {
        console.error('Error updating translated text: ', error);
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
