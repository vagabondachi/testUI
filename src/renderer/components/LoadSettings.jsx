import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import firebase from 'firebase/app';
import { useDispatch } from 'react-redux';
import store from 'renderer/store/store';

const LoadSettings = () => {
  const user = firebase.auth().currentUser;
  useEffect(() => {
    if (user) {
      firebase
        .firestore()
        .collection('users')
        .where('userId', '==', user.uid)
        .onSnapshot((snapshot) => {
          snapshot.docs.map((doc) => {
            store.dispatch({
              type: 'SET_USERLANG',
              userLang: doc.data().userLanguage,
            });
            store.dispatch({
              type: 'SET_LANGUAGE_TRANSLATE_TO',
              languageTranslateTo: doc.data().translateToLanguage,
            });
          });
        });
    }
  }, []);
  return <></>;
};

export default LoadSettings;
