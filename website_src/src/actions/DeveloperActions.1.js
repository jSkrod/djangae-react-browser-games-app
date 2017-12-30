export const MANAGE_GAMES_OPTION_SELECTED_ACTION_NAME = "MANAGE_GAMES_OPTION_SELECTED_ACTION";
export function manageGamesSelected(){
    return {
        type: MANAGE_GAMES_OPTION_SELECTED_ACTION_NAME
    }
};

export const ADD_GAME_OPTION_SELECTED_ACTION_NAME = "ADD_GAME_OPTION_SELECTED_ACTION";
export function addGameSelected(){
    return {
        type: ADD_GAME_OPTION_SELECTED_ACTION_NAME
    }

}
export const GAME_INSERTED_ACTION_NAME = "GAME_INSERTED_ACTION";
export function gameInserted(name){
    return {
        type: GAME_INSERTED_ACTION_NAME,
        payload: {
            name: name
        }
    }

}
export const GAME_SUBMITED_ACTION_NAME = "GAME_SUBMITED_ACTION";
export function gameSubmited(data, url){
    return {
        type: GAME_SUBMITED_ACTION_NAME,
        payload: {
            data: data,
            url: url
        }
    }

}

export const ADD_GAME_SERVER_RESPONSE_ACTION_NAME = "ADD_GANE_SERVER_RESPONSE_ACTION";
export function serverResponse(payload) {
    return {
        type: ADD_GAME_SERVER_RESPONSE_ACTION_NAME,
        payload: {
            payload
        }
    }
}

export const ADD_GAME_SERVER_ERROR_ACTION_NAME = "ADD_GAME_SERVER_ERROR_ACTION";
export function serverError(payload) {
    return {
        type: ADD_GAME_SERVER_ERROR_ACTION_NAME,
        payload: {
            payload
        }
    }
}
export const GET_MANAGEABLE_GAMES_ACTION_NAME = "GET_MANAGEABLE_GAMES";
export function getManageableGames(user) {
    return {
        type: GET_MANAGEABLE_GAMES_ACTION_NAME,
        payload: user,
    }
}
export const GET_UPLOAD_URL_DEVELOPER_ADD_GAME_ACTION_NAME = "GET_UPLOAD_URL_ADD_GAME";
export function getUploadURL() {
    return {
        type: GET_UPLOAD_URL_DEVELOPER_ADD_GAME_ACTION_NAME
    }
}
export const ON_SERVER_RESPONSE_GET_MANAGEABLE_GAMES_ACTION_NAME = "ON_SERVER_RESPONSE_GET_MANAGEABLE_GAMES";
export function onGetManageableGamesServerResponse (payload) {
    return {
        type: ON_SERVER_RESPONSE_GET_MANAGEABLE_GAMES_ACTION_NAME,
        payload: payload
    }
}
export const ON_SERVER_RESPONSE_GET_UPLOAD_URL_ACTION_NAME = "SERVER_RESPONSE_GET_URL_ADD_GAME";
export function onGetUploadURLServerResponse (payload) {
    return {
        type: ON_SERVER_RESPONSE_GET_UPLOAD_URL_ACTION_NAME,
        payload: payload
    }
}

export const ON_SERVER_ERROR_GET_UPLOAD_URL_ACTION_NAME = "SERVER_ERROR_GET_UPLOAD_URL_ACTION_ADD_GAME";
export function onServerErrorGetUploadUrl (payload) {
    return {
        type: ON_SERVER_RESPONSE_GET_UPLOAD_URL_ACTION_NAME,
        payload: payload
    }
}

export const DEVELOPER_ADD_VIEW_WILL_UNMOUNT_ACTION_NAME = "DEVELOPER_ADD_VIEW_WILL_UNMOUNT_ACTION_NAME";
export function unmountAddGameView() {
    return {
        type: DEVELOPER_ADD_VIEW_WILL_UNMOUNT_ACTION_NAME
    }
}

export const REMOVE_GAME_ACTION_NAME = "REMOVE_GAME_ACTION_NAME";
export function removeGame(gameName) {
    return {
        type: REMOVE_GAME_ACTION_NAME,
        payload: gameName
    }
}