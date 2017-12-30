

export const GAME_SELECTED_ACTION_NAME = "GAME_SELECTED"
export function selectGame(gamename){
    return {
        type: GAME_SELECTED_ACTION_NAME,
        payload: gamename
    }
}

export const FILTER_GAMES_ACTION_NAME = "FILTER_GAMES"
export function filterGames(genre){
    return {
        type: FILTER_GAMES_ACTION_NAME,
        payload: genre
    }
}

export const GET_ALL_GAMES_ACTION_NAME = "GET_ALL_GAMES";
export function getAllGames() {
    return {
        type: GET_ALL_GAMES_ACTION_NAME
    }
}
export const CANCEL_FETCHING_GAMES_ACTION_NAME = "CANCEL_FETCHING_GAMES";
export function cancelFetchingGames() {
    return {
        type: CANCEL_FETCHING_GAMES_ACTION_NAME
    }
}
export const ON_SERVER_RESPONSE_GET_ALL_GAMES_ACTION_NAME = "ON_SERVER_RESPONSE_GET_ALL_GAMES";
export function onGetAllGamesServerResponse (payload) {
    return {
        type: ON_SERVER_RESPONSE_GET_ALL_GAMES_ACTION_NAME,
        payload: payload
    }
}