
const initState = {
    chatWith : ''
}

const chatRoomReducer = (state = initState, action) => {
    switch(action.type){
        case 'FETCH_MESSAGE':
            console.log('fetched message');
            return {
                ...state,
                chatWith : action.idChatUser
            }
        default :
            return state;
    }
}

export default chatRoomReducer;