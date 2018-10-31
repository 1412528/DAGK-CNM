import { combineReducers} from 'redux'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from "react-redux-firebase";
import authReducer from './authReducer';

// Add firebase to reducers
export const rootReducer = combineReducers({
  auth : authReducer,
  firestore: firestoreReducer,
  firebase : firebaseReducer
})

export default rootReducer;