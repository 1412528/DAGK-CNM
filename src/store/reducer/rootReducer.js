import { combineReducers} from 'redux'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from "react-redux-firebase";
import authReducer from './authReducer';
import chatRoomReducer from './chatRoomReducer';

export const rootReducer = combineReducers({
  auth : authReducer,
  chatRoom : chatRoomReducer,
  firestore: firestoreReducer,
  firebase : firebaseReducer
})

export default rootReducer;