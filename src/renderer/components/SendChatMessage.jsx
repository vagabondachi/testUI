import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import RecordRTC from 'recordrtc';
import store from '../store/store';
import bannedWords from './bannedWords';
import Joyride from 'react-joyride';

const SendChatMessage = () => {
  const [message, setMessage] = useState('');
  const db = firebase.firestore();
  const state = store.getState();
  const groupId = state.groupId;
  const userLang = state.userLang;
  const [recorder, setRecorder] = useState(null);
  const [isRecording, setRecordingStatus] = useState(false);
  const [groupName, setGroupName] = useState('');

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
    if (message.length > 0) {
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
          latest_message: censor(message),
          latest_sender: firebase.auth().currentUser.displayName,
        });
    } else {
      console.log('Message is empty');
    }
  };

  const startRecording = () => {
    setRecordingStatus(true);
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const newRecorder = RecordRTC(stream, {
        type: 'audio',
        mimeType: 'audio/mp3',
      });

      newRecorder.startRecording();
      setRecorder(newRecorder);
    });
  };

  const stopRecording = () => {
    setRecordingStatus(false);
    recorder.stopRecording(() => {
      const audioBlob = recorder.getBlob();

      // Create a new form object and add the audio file to it.
      const form = new FormData();
      form.append('mp3_file', audioBlob);

      // Send the form to the API endpoint using fetch with a custom header.
      fetch('https://speech-chi.vercel.app/upload_mp3', {
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
  };

  useEffect(() => {
    db.collection('conversations')
      .doc(groupId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setGroupName(doc.data().name);
        }
      });
  });
  const [steps, setSteps] = useState([
    {
      target: '#message-area',
      content: 'Hi!! This is where you type in your text/s',
      placement: 'top',
    },
    {
      target: '#message-area',
      content: 'Just hit keyboard enter key to send your message',
      placement: 'top',
    },
    {
      target: '#btnmic',
      content: 'This is your speech-to-text mic',
      placement: 'top-end',
    },
    {
      target: '#btnmic',
      content: 'Click it to start recording',
      placement: 'top-end',
    },
    {
      target: '#btnmic',
      content: 'Click it again. Texts will render soon after.',
      placement: 'top-end',
    },
  ]);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const handleTourCallback = (data) => {
    const { action, index, type } = data;
    if (type === 'step:before') {
      // do something on step change
    }
  };

  return (
    <div id="footer">
      <form onSubmit={handleSubmit}>
        <div className="footer-content">
          <input
            id="message-area"
            name="text"
            placeholder={'Message ' + groupName}
            value={message}
            autoFocus
            onChange={(e) => setMessage(e.target.value)}
            onClick={() => setIsTourOpen(true)}
          />

          {isRecording ? (
            <button id="btnmic" onClick={stopRecording}>
              <i id="offmic" className="ri-mic-off-line" />
            </button>
          ) : (
            <button id="btnmic" onClick={startRecording}>
              <i id="onmic" className="ri-mic-line" />
            </button>
          )}
        </div>
        <Joyride
          hideCloseButton
          showProgress
          showSkipButton
          steps={[]}
          continuous
          scrollToFirstStep
          key={isTourOpen}
          steps={steps}
          run={isTourOpen}
          callback={handleTourCallback}
          styles={{
            options: {
              textColor: '#fff',
              arrowColor: '#fff',
              backgroundColor: '#fff',
              overlayColor: 'rgba(0, 0, 0, 0.5)',
              primaryColor: '#333',
              textColor: '#000000',
              width: '350px',
            },
          }}
        />
      </form>
    </div>
  );
};

export default SendChatMessage;
