/*
 * action types
 */
export const FETCH_MESSAGE_SUCCESS = 'FETCH_MESSAGE_SUCCESS';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const FETCH_PEOPLE_SUCCESS = 'FETCH_PEOPLE_SUCCESS';
export const SEARCH_PEOPLE_SUCCESS = 'SEARCH_PEOPLE_SUCCESS';
export const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS';
/*
 * action creators
 */
export const fetchMessage = (idChatUser, idUser) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        const rooms = getState().firestore.ordered.chatRoom;

        if(idChatUser === null && idUser === null){
            dispatch({ type: FETCH_MESSAGE_SUCCESS, chatRoom : {idChatUser, idChatRoom : null}});
        }

        let idChatRoom = null;
        rooms.map(room => {
            if(room.meta[0].id === idUser && room.meta[1].id === idChatUser || room.meta[1].id === idUser && room.meta[0].id === idChatUser){
                idChatRoom = room.id;
            }
        })
        if(idChatRoom){
            dispatch({ type: FETCH_MESSAGE_SUCCESS, chatRoom : { idChatUser, idChatRoom } });
        }
        else{            
            firestore.collection('chatRoom').add({
                messages : [],
                meta : [ { id: idUser }, { id: idChatUser } ],
                lastChatAt : null
            }).then((result) => {                
                dispatch({ type: FETCH_MESSAGE_SUCCESS, chatRoom : { idChatUser, idChatRoom : result.id } });
            })
        }
    }
}

export const sendMessage = (input) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        const idRoom = getState().chatRoom.idChatRoom;
        const message = input.replace(/\r\n|\r|\n/g, "");
        let type = 0;
        
        if(isDataURL(message) || checkURL(message)){
            type = 1;
        }    
        firestore.collection('chatRoom').doc(idRoom).get()
        .then((result) => {
            const messageList = result.data().messages;
            messageList.push(
                {
                    author: {
                        id: getState().firebase.auth.uid,
                        name: getState().firebase.profile.userName,
                        photoURL : getState().firebase.profile.photoURL
                    },
                    sendAt: new Date(),
                    text: message,
                    type : type
                }
            );
            return messageList;            
        }).then((result) => {
            firestore.collection('chatRoom').doc(idRoom).update({
                messages: result,
                lastChatAt: new Date()
            });
        }).then(() => {
            dispatch({type: SEND_MESSAGE_SUCCESS});
        })
        // .catch((err) => {
        //     dispatch({type: 'SEND_MESSAGE_ERROR', err })
        // })
    }
}

export const fetchPeople = () => {
    return (dispatch, getState) => {
        const users = getState().firestore.ordered.users;
        const chatRoom = getState().firestore.ordered.chatRoom;
        const uid = getState().firebase.auth.uid;

        let promise = new Promise((resolve, reject) => {
            let chatUsers = [];
            
            chatRoom && chatRoom.map(room => {
                if (room.meta[0].id !== uid && room.meta[1].id === uid) {
                    chatUsers.push(room.meta[0].id);
                }
                else if (room.meta[1].id !== uid && room.meta[0].id === uid) {
                    chatUsers.push(room.meta[1].id);
                }
            })
            users && users.map(user => {
                if(!chatUsers.includes(user.id) && user.id !== uid)
                    chatUsers.push(user.id);
            })
            resolve(chatUsers);
        })
        promise.then(chatUsers => dispatch({ type : FETCH_PEOPLE_SUCCESS, chatUsers}))
    }
}

export const searchPeople = (input) => {
    return (dispatch, getState) => {
        const users = getState().firestore.ordered.users;
        const chatUsers = getState().chatRoom.chatUsers;
        let filter = change_alias(input).toUpperCase();
        let searchUsers = [];

        let promise = new Promise((resolve, reject) => {
            if(filter === ""){
                searchUsers = chatUsers.slice();
            }
            else{
                users.forEach(user => {
                    if(chatUsers.includes(user.id) && change_alias(user.userName).toUpperCase().indexOf(filter) > -1){
                        searchUsers.push(user.id);
                    }
                });
            }            
            resolve(searchUsers);
        })
        promise.then((searchUsers) => dispatch({ type : SEARCH_PEOPLE_SUCCESS, searchUsers}))
    }
}

export const uploadFile = (file) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        let storageImgRef = firebase.storage().ref().child("images");
        const idRoom = getState().chatRoom.idChatRoom;

        var imgFileRef = storageImgRef.child(file.name);
        imgFileRef.put(file)
        .then((snap) => {
            return snap.ref.getDownloadURL();
        }).then(url => {
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
                        text: url,
                        type : 1
                    }
                );
                return messageList;            
            }).then((result) => {
                firestore.collection('chatRoom').doc(idRoom).update({
                    messages: result,
                    lastChatAt: new Date()
                });
            })
        }).then(() => { 
            dispatch({type: UPLOAD_FILE_SUCCESS});
        })
    }
}

function change_alias(alias) {
    var str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    str = str.replace(/ + /g," ");
    str = str.trim(); 
    return str;
}

function isDataURL(s) {
    return !!s.match(isDataURL.regex);
}
isDataURL.regex = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;

function checkURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}