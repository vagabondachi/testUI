import { createStore } from 'redux';

// Initial State
const initialState = {
  groupId: null,
  user: null,
  sidebar: 'chats',
  userLang: 'en',
  languageTranslateTo: 'en',
};

// Reducer
function Reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_GROUP_ID':
      return {
        ...state,
        groupId: action.groupId,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };
    case 'SET_SIDEBAR_VIEW':
      return {
        ...state,
        sidebar: action.sidebar,
      };
    case 'SET_USERLANG':
      return {
        ...state,
        userLang: action.userLang,
      };
    case 'SET_LANGUAGE_TRANSLATE_TO':
      return {
        ...state,
        languageTranslateTo: action.languageTranslateTo,
      };
    case 'RESET_STATE':
      return initialState;
    default:
      return state;
  }
}

// Store
const store = createStore(Reducer);

export default store;
