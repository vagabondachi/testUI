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
      <form className="nosubmit">
        <input className="nosubmit" type="search" placeholder="Find group..." />
      </form>
      <div id="quick-actions">
        <ul>
          <li><i class="ri-at-line"/> Mentions</li>
          <li><i class="ri-star-smile-fill"/> Starred</li>
        </ul>
      </div>
      <div className="add-channel">
        <p>Team Messages</p>
        <div className="btn-add-container">
          <button className="btn-create-group">
            <span> Create group </span>
            <i className="ri-add-line" onClick={() => { showCreateNewChat(!newChat); }}/>
          </button>
        </div>
      </div>
      <div className="wrapper">
        <div className="content">
          <div className={newChat ? 'addChatPoPBox shown' : 'addChatPopBox hidden'}>
            <CreateGroupForm/>
          </div>
        </div>
      </div>
      <div className="recents">
        <p>Recent Chats</p>
        <ul>
          {conversations.map((conversation) => (
            <div className="sidebaritems-container">
              <li
                key={conversation.id}
                onClick={() => {
                  handleClick(conversation.id);
                }}
              >
                <div className="recents-container">
                  <div className="circle-msg">
                    <img height="33" width="33" src={faker.image.avatar()} />
                  </div>
                  <div className="recentconvo-info"> <b>{conversation.name}</b>
                    <p className="recentSender_Message_Date">
                      {conversation.latest_sender && conversation.latest_message && 
                      conversation.latest_time_message
                      ? (conversation.latest_sender +
                        ': ' +
                        conversation.latest_message.substring(0, 18) +
                        '... • ' +
                        getFormattedTime(conversation.latest_time_message.toDate())
                      )
                      : ''}
                    </p>
                  </div>
                </div>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default RecentChats;
