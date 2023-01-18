import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import store from '../store/store';
import { useSelector } from 'react-redux';
import { faker } from '@faker-js/faker';
import CreateGroupForm from './CreateGroup';

function RecentChats() {
  const [conversations, setConversations] = useState([]);
  const db = firebase.firestore();
  const userId = useSelector((state) => state.user.uid);

  useEffect(() => {
    db.collection('conversations')
      .where('members', 'array-contains', userId)
      .onSnapshot((snapshot) => {
        const newConversations = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            latest_sender: doc.data().latest_sender,
            latest_message: doc.data().latest_message,
            ...doc.data(),
          }))
          .sort((a, b) => b.latest_time_message - a.latest_time_message);
        setConversations(newConversations);
      });
  }, []);

  const handleClick = (conversationId) => {
    store.dispatch({ type: 'SET_GROUP_ID', groupId: conversationId });
  };

  const getFormattedTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    let ampm = 'am';
    if (hours >= 12) {
      ampm = 'pm';
      hours -= 12;
    }
    return `${hours}:${minutes} ${ampm}`;
  };

  const [newChat, showCreateNewChat] = useState(false);

  return (
    <>
      {/* <form className="nosubmit">
        <input className="nosubmit" type="search" placeholder="Find group..." />
      </form> */}
      <div className="recents">
        {/* <div id="quick-actions">
          <ul>
            <li>
              <i class="ri-at-line" /> Mentions
            </li>
            <li>
              <i class="ri-star-smile-fill" /> Starred
            </li>
          </ul>
        </div> */}
        <div className="add-channel">
          <p>Team Messages</p>
          <div className="btn-add-container">
            <button className="btn-create-group">
              <span> Create Channel </span>
              <i
                className="ri-chat-new-fill"
                onClick={() => {
                  showCreateNewChat(!newChat);
                }}
              />
            </button>
          </div>
        </div>

        <div
          className={newChat ? 'addChatPoPBox shown' : 'addChatPopBox hidden'}
        >
          <CreateGroupForm />
        </div>
        <p id="recent-subheader">Recent Chats</p>
      </div>
      <ul>
        {conversations.map((conversation) => (
          <li
            key={conversation.id}
            onClick={() => {
              handleClick(conversation.id);
            }}
          >
            <div className="sidebaritems-container">
              <div className="recents-container">
                <div className="circle-msg">
                  <img height="33" width="33" src={faker.image.avatar()} />
                </div>
                <div className="recentconvo-info">
                  <div id="recentsheader">
                    <div id="recentsheader-name">
                      {conversation.name.substring(0, 9)}
                    </div>
                    <div id="recentsheader-time">
                      {conversation.latest_time_message
                        ? '' +
                          getFormattedTime(
                            conversation.latest_time_message.toDate()
                          )
                        : ''}
                    </div>
                  </div>
                  <p className="recentSender_Message_Date">
                    {conversation.latest_sender && conversation.latest_message
                      ? conversation.latest_sender +
                        ':  ' +
                        conversation.latest_message.substring(0, 8)
                      : ''}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default RecentChats;
