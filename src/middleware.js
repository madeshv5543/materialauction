import agent from './agent';
import {
  ASYNC_START,
  ASYNC_END,
  LOGIN,
  REGISTER,
  LOGOUT,
} from './actions/types'

const promiseMiddleware = store => next => action => {
  console.log("action promise", action)
  if(isPromise(action.payload)) {
    store.dispatch({ type: ASYNC_START, subtype: action.type});

    const currentView = store.getState().viewChangeCounter;
    const skipTracking = action.skipTracking;

    action.payload.then(
      res => {
        const currentState = store.getState()
        if(!skipTracking && currentState.viewChangeCounter !== currentView ) {
          return 
        }
        console.log('RESULT', res);
        action.payload = res
        action.success = true
        store.dispatch({ type: ASYNC_END, promise: action.payload});
        store.dispatch(action)
      },
      err => {
        const currentState = store.getState()
        if(!skipTracking && currentState.viewChangeCounter !== currentView) {
          return
        }
        console.log('Error ', err)
        action.error = true
        action.payload = err.response.body
        if(!action.skipTracking) {
          store.dispatch({ type: ASYNC_END, promise: action.payload});
        }
        store.dispatch(action)
      }
    )
      return ;
  }
  next(action);
}

const localStorageMiddleware = store => next => action => {
  if(action.type === REGISTER || action.type === LOGIN) {
    console.log("action in localstoreage", action)
    if(!action.error) {
      window.localStorage.setItem('jwt', action.payload.token)
      agent.setToken(action.payload.token)
    }
  }else if( action.type === LOGOUT) {
    window.localStorage.setItem('jwt', '');
    agent.setToken(null)
  }
  next(action)
}

function isPromise(v) {
  return v  && typeof v.then === 'function';
}

export { promiseMiddleware, localStorageMiddleware}