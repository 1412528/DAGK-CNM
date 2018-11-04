export const fetchMessage = (idChatUser) => {
    return (dispatch, getState,  {getFirestore}) => {        
        dispatch({ type: 'FETCH_MESSAGE', idChatUser});
    }
}