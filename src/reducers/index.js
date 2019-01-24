import { combineReducers } from 'redux'
import web3Reducer from './web3Reducer'
import imageReducer from './imageReducer'
import auctionReducer from './auctionReducer'
import authReducer from './authReducer'
import common from './commonReducer'

export default combineReducers({
  web3: web3Reducer,
  image: imageReducer,
  auction: auctionReducer,
  common,
  auth: authReducer,
})
