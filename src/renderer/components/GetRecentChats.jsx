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

  return (
    <ul>
      {conversations.map((conversation) => (
        <li
          key={conversation.id}
          onClick={() => {
            handleClick(conversation.id);
          }}
        >
          <div className="circle-msg">
            <img height="42" width="42" src={faker.image.avatar()} />
          </div>
          {conversation.name} <br />
          {conversation.latest_time_message &&
            conversation.latest_time_message.toDate().toLocaleString()}
        </li>
      ))}
    </ul>
  );
}

export default RecentChats;
