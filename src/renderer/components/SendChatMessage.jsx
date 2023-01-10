import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import RecordRTC from 'recordrtc';
import store from '../store/store';
import bannedWords from './bannedWords';

const SendChatMessage = () => {
  const [message, setMessage] = useState('');
  const db = firebase.firestore();
  const state = store.getState();
  const groupId = state.groupId;
  const userLang = state.userLang;
  const [recorder, setRecorder] = useState(null);
  const [isRecording, setRecordingStatus] = useState(false);

  const censor = (text) => {
    const words = text.split(' ');
    for (let i = 0; i < words.length; i++) {
      if (bannedWords.includes(words[i].toLowerCase())) {
        if (words[i].length === 1) {
          words[i] = '*';
        } else {
          const firstLetter = words[i][0];
          const asterisks = '*'.repeat(words[i].length - 1);
          words[i] = firstLetter + asterisks;
        }
      }
    }
    return words.join(' ');
  };

  /**
   * When the user submits the form, the message is added to the database and the user is added to the
   * members array.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    db.collection('conversations')
      .doc(groupId)
      .collection('messages')
      .add({
        sender: firebase.auth().currentUser.displayName,
        text: censor(message),
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

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const newRecorder = RecordRTC(stream, {
        type: 'audio',
        mimeType: 'audio/mp3',
      });

      newRecorder.startRecording();
      setRecorder(newRecorder);
    });
    setRecordingStatus(true);
  };

  const stopRecording = () => {
    recorder.stopRecording(() => {
      const audioBlob = recorder.getBlob();

      // Create a new form object and add the audio file to it.
      const form = new FormData();
      form.append('mp3_file', audioBlob);

      // Send the form to the API endpoint using fetch with a custom header.
      fetch('https://jellyfish-app-4424e.ondigitalocean.app/upload_mp3', {
        method: 'POST',
        body: form,
        headers: {
          'X-speech-language-code': userLang,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            console.error(
              `Request failed with status ${response.status}: ${response.statusText}`
            );
          }
        })
        .then((responseBody) => {
          setMessage(responseBody.message);
        })
        .catch((error) => {
          console.error(error);
        });
    });
    setRecordingStatus(false);
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
        {isRecording ? (
          <button className="fieldicon-btn" onClick={stopRecording}>
            <i className="ri-mic-2-fill"></i>
          </button>
        ) : (
          <button className="fieldicon-btn" onClick={startRecording}>
            <i className="ri-mic-2-fill"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default SendChatMessage;
