import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { promiseMiddleware, localStorageMiddleware } from './middleware'


import rootReducer from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middleware = [thunk, promiseMiddleware, localStorageMiddleware]
const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(...middleware))
)

export default store
