import React, { useState, useEffect } from 'react';
import SelectLanguage from './SelectLanguage';
import { faker } from '@faker-js/faker';
import firebase from 'firebase/app';
import 'firebase/firestore';
import store from '../store/store';

const Settings = () => {
  const [username, setUserName] = useState('');
  const db = firebase.firestore();
  const state = store.getState();
  const userId = state.userId;

  useEffect(() => {
    db.collection('users')
      .doc(userId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setUserName(doc.data().name);
        }
      });
  });

  return (
    <>
      <img src={faker.image.avatar()} />
      <p>{username}</p>
      <div id="languageSettings">
        <SelectLanguage />
      </div>
    </>
  );
};

export default Settings;
