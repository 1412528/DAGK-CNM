export const fetchMessage = (idChatUser, idUser) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        const rooms = getState().firestore.ordered.chatRoom;

        let idRoom = null;
        rooms.map(room => {
            if(room.meta.user1 == idUser && room.meta.user2 == idChatUser || room.meta.user2 == idUser && room.meta.user1 == idChatUser){
                idRoom = room;
            }
        })
        if(idRoom){
            dispatch({ type: 'FETCH_MESSAGE', chatRoom : {idChatUser, idChatRoom : idRoom}});
        }
        else{
            firestore.collection('chatRoom').add({
                messages : [],
                meta : {
                    user1 : idUser,
                    user2 : idChatUser
                }
            }).then((result) => {
                dispatch({ type: 'FETCH_MESSAGE', chatRoom : {idChatUser, idChatRoom : result.id}});
            })
        }
    }
}

export const sendMessage = () => {
    return (dispatch, getState, {getFirestore}) => {

    }
}