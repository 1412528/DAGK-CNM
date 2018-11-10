const initState = {
    chatWith : null,
    idChatRoom : null,
    chatUsers : [],
    searchUsers : []
}

const chatRoomReducer = (state = initState, action) => {
    switch(action.type){
        case 'FETCH_MESSAGE':
            console.log('Fetch message success');
            return {
                ...state,
                chatWith : action.chatRoom.idChatUser,
                idChatRoom : action.chatRoom.idChatRoom
            }
        case 'SEND_MESSAGE_SUCCESS':
            console.log('Send message success');
            return state;
        case 'SEND_MESSAGE_ERROR':
            console.log('Send message fail');
            return state;
        case 'FETCH_PEOPLE_SUCCESS':
            console.log('Fetch people success');
            return {
                ...state,
                chatUsers : action.chatUsers,
                searchUsers : action.chatUsers
            }
        case 'SEARCH_PEOPLE_SUCCESS':
            console.log('Search people success');
            return {
                ...state,
                searchUsers : action.searchUsers
            }
        default :
            return state;
    }
}

export default chatRoomReducer;