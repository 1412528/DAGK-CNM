export const fetchMessage = (idChatUser, idUser) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        const rooms = getState().firestore.ordered.chatRoom;

        let idChatRoom = null;
        rooms.map(room => {
            if(room.meta[0].id == idUser && room.meta[1].id == idChatUser || room.meta[1].id == idUser && room.meta[0].id == idChatUser){
                idChatRoom = room.id;
            }
        })
        if(idChatRoom){
            dispatch({ type: 'FETCH_MESSAGE', chatRoom : { idChatUser, idChatRoom } });
        }
        else{
            // const userChat = getState().firestore.ordered.users.filter(user =>{
            //     return idChatUser === user.id;
            // });
            
            firestore.collection('chatRoom').add({
                messages : [],
                meta : [
                    {
                        id: idUser,
                        // name: getState().firebase.profile.userName,
                        // photoURL : getState().firebase.profile.photoURL
                    },
                    {
                        id: idChatUser,
                        // name: userChat[0].userName,
                        // photoURL : userChat[0].photoURL
                    }
                ],
                lastChatAt : null
            }).then((result) => {
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
                        name: getState().firebase.profile.userName,
                        photoURL : getState().firebase.profile.photoURL
                    },
                    sendAt: new Date(),
                    text: message
                }
            );
            // console.log(messageList);
            return messageList;            
        }).then((result) => {
            firestore.collection('chatRoom').doc(idRoom).update({
                messages: result,
                lastChatAt: new Date()
            });
        }).then(() => {
            dispatch({type: 'SEND_MESSAGE_SUCCESS'})
        }).catch((err) => {
            dispatch({type: 'SEND_MESSAGE_ERROR' })
        })
    }
}