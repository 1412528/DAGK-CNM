import {
    FETCH_MESSAGE_SUCCESS,
    SEND_MESSAGE_SUCCESS,
    FETCH_PEOPLE_SUCCESS,
    SEARCH_PEOPLE_SUCCESS,
    UPLOAD_FILE_SUCCESS
} from '../actions/chatRoomAction';

const initState = {
    chatWith : null,
    idChatRoom : null,
    chatUsers : [],
    searchUsers : []
}

const chatRoomReducer = (state = initState, action) => {
    switch(action.type){
        case FETCH_MESSAGE_SUCCESS:
            return {
                ...state,
                chatWith : action.chatRoom.idChatUser,
                idChatRoom : action.chatRoom.idChatRoom
            }
        case SEND_MESSAGE_SUCCESS:
            return state;
        case FETCH_PEOPLE_SUCCESS:
            return {
                ...state,
                chatUsers : action.chatUsers,
                searchUsers : action.chatUsers
            }
        case SEARCH_PEOPLE_SUCCESS:
            return {
                ...state,
                searchUsers : action.searchUsers
            }
        case UPLOAD_FILE_SUCCESS:            
            return state;
        default :
            return state;
    }
}

export default chatRoomReducer;