import {
  LOGIN,
  REGISTER,
  LOGIN_PAGE_UNLOADED,
  REGISTER_PAGE_UNLOADED,
  ASYNC_START,
  UPDATE_FIELD_AUTH
} from '../actions/types'

export default ( state = {}, action) => {
    switch (action.type) {
      case LOGIN:
      case REGISTER:
      console.log('action', action)
        return {
          ...state,
          inProgress: false,
          data: action.success ? action.payload.data : null,
          errors : action.error ? action.payload.message : null
        };
      case LOGIN_PAGE_UNLOADED:
      case REGISTER_PAGE_UNLOADED:
        return {}
      case ASYNC_START:
        if(action.subtype  === LOGIN || action.subtype === REGISTER) {
          return {...state, inProgress: true};
        }
        break;
      case UPDATE_FIELD_AUTH:
        console.log("action", action)
        return { ...state, [action.key]: action.value };
      default:
        return state;
    }
    return state;
};