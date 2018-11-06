export const fetchMessage = (idChatUser, idUser) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        const rooms = getState().firestore.ordered.chatRoom;

        let idChatRoom = null;
        rooms.map(room => {
            if(room.meta.user1 == idUser && room.meta.user2 == idChatUser || room.meta.user2 == idUser && room.meta.user1 == idChatUser){
                idChatRoom = room.id;
            }
        })
        if(idChatRoom){
            dispatch({ type: 'FETCH_MESSAGE', chatRoom : { idChatUser, idChatRoom } });
        }
        else{
            firestore.collection('chatRoom').add({
                messages : [],
                meta : {
                    user1 : idUser,
                    user2 : idChatUser
                }
            }).then((result) => {
                // console.log(result);
                     
                dispatch({ type: 'FETCH_MESSAGE', chatRoom : { idChatUser, idChatRoom : result.id } });
            })
        }
    }
}

export const sendMessage = (message) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        const idRoom = getState().chatRoom.idChatRoom;

        firestore.collection('chatRoom').doc(idRoom).get()
        .then((result) => {
            const messageList = result.data().messages
            messageList.push(
                {
                    author: {
                        id: getState().firebase.auth.uid,
                        name: getState().firebase.profile.userName
                    },
                    sendAt: new Date(),
                    text: message
                }
            );
            // console.log(messageList);
            return messageList;            
        }).then((result) => {
            firestore.collection('chatRoom').doc(idRoom).update({
                messages : result
            });
        }).then(() => {
            dispatch({type: 'SEND_MESSAGE_SUCCESS'})
        }).catch((err) => {
            dispatch({type: 'SEND_MESSAGE_ERROR' })
        })
    }
}