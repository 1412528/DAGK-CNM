const initState = {
    chatWith : null,
    idChatRoom : null
}

const chatRoomReducer = (state = initState, action) => {
    switch(action.type){
        case 'FETCH_MESSAGE':
            console.log('fetch message success');
            return {
                ...state,
                chatWith : action.chatRoom.idChatUser,
                idChatRoom : action.chatRoom.idChatRoom
            }
        case 'SEND_MESSAGE_SUCCESS':
            console.log('send message success');
            return state;
        case 'SEND_MESSAGE_ERROR':
            console.log('send message fail');
            return state;
        default :
            return state;
    }
}

export default chatRoomReducer;