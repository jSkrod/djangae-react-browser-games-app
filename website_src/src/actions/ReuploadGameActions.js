export const DEVELOPER_REUPLOAD_VIEW_WILL_UNMOUNT_ACTION_NAME = "DEVELOPER_REUPLOAD_VIEW_WILL_UNMOUNT_ACTION_NAME";
export function unmountReuploadGameView() {
    return {
        type: DEVELOPER_REUPLOAD_VIEW_WILL_UNMOUNT_ACTION_NAME
    }
}

export const REUPLOAD_GAME_SUBMITED_ACTION_NAME = "REUPLOAD_GAME_SUBMITED_ACTION";
export function reuploadGameSubmited(data, url){
    return {
        type: REUPLOAD_GAME_SUBMITED_ACTION_NAME,
        payload: {
            data: data,
            url: url
        }
    }

}

export const REUPLOAD_GAME_SERVER_RESPONSE_ACTION_NAME = "REUPLOAD_GAME_SERVER_RESPONSE_ACTION";
export function serverResponse(payload) {
    return {
        type: REUPLOAD_GAME_SERVER_RESPONSE_ACTION_NAME,
        payload: {
            payload
        }
    }
}

export const REUPLOAD_GAME_SERVER_ERROR_ACTION_NAME = "REUPLOAD_GAME_SERVER_ERROR_ACTION";
export function serverError(payload) {
    return {
        type: REUPLOAD_GAME_SERVER_ERROR_ACTION_NAME,
        payload: {
            payload
        }
    }
}

export const GET_UPLOAD_URL_DEVELOPER_REUPLOAD_GAME_ACTION_NAME = "GET_UPLOAD_REUPLOAD_GAME";
export function getUploadURL(payload) {
    return {
        type: GET_UPLOAD_URL_DEVELOPER_REUPLOAD_GAME_ACTION_NAME,
        payload: payload
    }
}

export const ON_SERVER_RESPONSE_GET_REUPLOAD_URL_ACTION_NAME = "SERVER_RESPONSE_GET_URL_REUPLOAD_GAME";
export function onGetUploadURLServerResponse (payload) {
    return {
        type: ON_SERVER_RESPONSE_GET_REUPLOAD_URL_ACTION_NAME,
        payload: payload
    }
}

export const ON_SERVER_ERROR_GET_REUPLOAD_URL_ACTION_NAME = "SERVER_ERROR_GET_UPLOAD_URL_ACTION_REUPLOAD_GAME";
export function onServerErrorGetUploadUrl (payload) {
    return {
        type: ON_SERVER_RESPONSE_GET_REUPLOAD_URL_ACTION_NAME,
        payload: payload
    }
}