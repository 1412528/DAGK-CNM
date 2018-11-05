const initState = {
    chatWith : null,
    idChatRoom : null
}

const chatRoomReducer = (state = initState, action) => {
    switch(action.type){
        case 'FETCH_MESSAGE':
            console.log('fetched message');
            return {
                ...state,
                chatWith : action.chatRoom.idChatUser,
                idChatRoom : action.chatRoom.idChatRoom
            }
        
        default :
            return state;
    }
}

export default chatRoomReducer;