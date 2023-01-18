import React, { useState, useEffect, useRef } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import store from '../store/store';
import SendChatMessage from './SendChatMessage';
import translateIcon from '../../../assets/translate.png';
import { faker } from '@faker-js/faker';
import SimpleBar from 'simplebar-react';
import Joyride from 'react-joyride';
import 'simplebar/dist/simplebar.min.css';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [currentMessageText, setCurrentMessageText] = useState({});
  const [translatedTexts, setTranslatedTexts] = useState({});
  const db = firebase.firestore();

  const state = store.getState();
  const groupId = state.groupId;
  const translate_to_code = state.languageTranslateTo;

  const messageContainerRef = useRef(null);

  useEffect(() => {
    const { current } = messageContainerRef;

    current.scrollTo(0, current.scrollHeight);
  }, [messages]);

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

  const translate = async (text) => {
    const resp = await fetch('https://speech-chi.vercel.app/translate', {
      method: 'POST',
      body: JSON.stringify({ text }),
      headers: {
        'X-translate-to-code': translate_to_code,
      },
    });
    const data = await resp.json();
    return data.message;
  };

  const handleTranslate = async (messageId) => {
    // Find the message that needs to be translated
    const message = messages.find((message) => message.id === messageId);

    if (!translatedTexts[messageId]) {
      // Translate the message's text if it has not been translated yet
      const translatedText = await translate(message.text);

      // Update the translated texts in the local state with the translated text
      setTranslatedTexts((prevTranslatedTexts) => ({
        ...prevTranslatedTexts,
        [messageId]: translatedText,
      }));
    } else {
      // Remove the translated text if the message has already been translated
      setTranslatedTexts((prevTranslatedTexts) => {
        delete prevTranslatedTexts[messageId];
        return {
          ...prevTranslatedTexts,
        };
      });
    }
  };
  const [steps, setSteps] = useState([
    {
      target: '#transl8',
      content:
        'Hi!! When you click this icon, it will translate the text message into your desired language which is configured on the settings tab.',
    },
    {
      target: '#transl8',
      content: 'You can revert the orignal text message by clicking again ',
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
    <>
      <div id="chatview-header">
        <h1 id="GroupChat-name"> {groupName}</h1>
        <i class="ri-information-fill" />
      </div>

      <div className="message-container" ref={messageContainerRef}>
        <SimpleBar style={{ height: '100%' }}>
          <ul>
            {messages.map((message) => (
              <li key={message.id}>
                <div className="listofmessages">
                  <div className="circle-msg">
                    <img height="32" width="32" src={faker.image.avatar()} />
                  </div>

                  <div className="viewchat-container">
                    <small style={{ color: 'gray' }}>
                      {message.timestamp
                        ? message.timestamp
                          ? new Date(
                              message.timestamp.toDate()
                            ).toLocaleString()
                          : null
                        : null}
                    </small>
                    <br />
                    {message.sender} :{' '}
                    {translatedTexts[message.id] || message.text}
                    <img
                      id="transl8"
                      style={{
                        height: '20px',
                        margin: '0 5px 0 0',
                      }}
                      src={translateIcon}
                      onClick={() => {
                        handleTranslate(message.id), setIsTourOpen(true);
                      }}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
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
                arrowColor: '#fff',
                backgroundColor: '#fff',
                overlayColor: 'rgba(0, 0, 0, 0.5)',
                primaryColor: '#333',
                textColor: '#000000',
                width: '350px',
              },
            }}
          />
        </SimpleBar>
      </div>
      <SendChatMessage />
    </>
  );
}

export default Chat;
