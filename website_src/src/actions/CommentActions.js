export const SEND_COMMENT_ACTION_NAME = "SEND_COMMENT_ACTION";
export function sendComment(game,comment,rate){
    return{
        type: SEND_COMMENT_ACTION_NAME,
        payload: {
            game_name: game,
            text: comment,
            rating: rate,
        }
    }
}
export const SEND_COMMENT_SERVER_RESPONSE_ACTION_NAME = "SEND_COMMENT_SERVER_RESPONSE_ACTION"
export function onSendCommentServerResponse(payload){
    return{
        type: SEND_COMMENT_SERVER_RESPONSE_ACTION_NAME,
        payload: payload,
    }
}
export const SEND_COMMENT_SERVER_ERROR_ACTION_NAME = "SEND_COMMENT_SERVER_ERROR_ACTION"
export function onSendCommentServerError(payload){
    return{
        type: SEND_COMMENT_SERVER_ERROR_ACTION_NAME,
        payload: payload,
    }
}
export const GET_COMMENTS_ACTION_NAME = "GET_COMMENTS_ACTION";
export function getComments(game){
    return{
        type: GET_COMMENTS_ACTION_NAME,
        payload:{
            game_name: game,
        }
    }
}
export const GET_COMMENTS_SERVER_RESPONSE_ACTION_NAME = "GET_COMMENTS_SERVER_RESPONSE_ACTION"
export function onGetCommentsServerResponse(payload){
    return{
        type: GET_COMMENTS_SERVER_RESPONSE_ACTION_NAME,
        payload: payload,
    }
}
export const GET_COMMENTS_SERVER_ERROR_ACTION_NAME = "GET_COMMENTS_SERVER_ERROR_ACTION"
export function onGetCommentsServerError(payload){
    return{
        type: GET_COMMENTS_SERVER_ERROR_ACTION_NAME,
        payload: payload,
    }
}
export const CANCEL_FETCHING_COMMENTS_ACTION_NAME = "CANCEL_FETCHING_COMMENTS_ACTION";
export function cancelFetchingComments(){
    return{
        type: CANCEL_FETCHING_COMMENTS_ACTION_NAME,
    }
}