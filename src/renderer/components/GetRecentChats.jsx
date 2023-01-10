import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import store from '../store/store';
import { useSelector } from 'react-redux';
import { faker } from '@faker-js/faker';

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
    let ampm = 'AM';
    if (hours >= 12) {
      ampm = 'PM';
      hours -= 12;
    }
    return `${hours}:${minutes} ${ampm}`;
  };

  return (
    <>
      <form className="nosubmit">
        <input className="nosubmit" type="search" placeholder="Find group..." />
      </form>
      <div className="recents">
        <div className="add-channel">
          <div className="label-add">
            <p className="p-texts">Group Messages</p>
          </div>
          <div className="btn-add-container">
            <button className="btn-create-group">
              {' '}
              <span> Create group </span>
              <i className="ri-add-line"></i>{' '}
            </button>
          </div>
        </div>
        <hr />
        <p className="p-texts">Recent Chats</p>
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
                  <div className="recentconvo-info">
                    {conversation.name} <br /> {conversation.name}
                  </div>
                </div>
                {conversation.latest_time_message &&
                  getFormattedTime(conversation.latest_time_message.toDate())}
              </li>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default RecentChats;
