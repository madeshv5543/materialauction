import {
  GO_TO_HOME,
  APP_LOAD,
  REDIRECT,
  LOGIN,
} from '../actions/types'

const defaultState = {
  appname: 'ADHI Auction',
  token : null,
  viewChangeCounter: 0
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case APP_LOAD:
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload ? action.payload.user : null
      };
    case REDIRECT:
      return { ...state, redirectTo: null };
    case GO_TO_HOME:
      return {
        ...state,
        redirectTo: action.payload
      };
    case LOGIN:
      return {
        ...state,
        redirectTo: action.success ? '/home': null,
      }
    default:
      return state;
  }
};