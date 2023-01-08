import { createStore } from 'redux';

// Initial State
const initialState = {
  groupId: null,
  user: null,
  sidebar: 'chats',
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
    default:
      return state;
  }
}

// Store
const store = createStore(Reducer);

export default store;
