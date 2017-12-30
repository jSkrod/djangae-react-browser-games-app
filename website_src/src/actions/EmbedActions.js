export const GAME_LOADED_ACTION_NAME = "GAME_LOADED_ACTION";
export function gameLoaded(){
    return {
        type: GAME_LOADED_ACTION_NAME
    }
};

export const USER_NEW_SCORE_ACTION_NAME = "USER_NEW_SCORE_ACTION";
export function sendUserScore (score, gameName) {
    return {
        type: USER_NEW_SCORE_ACTION_NAME,
        payload: {
            score: score,
            gameName: gameName
        }
    };
}

export const USER_NEW_SCORE_RESPONSE = "USER_SCORE_RESPONSE";
export function scoreResponse(payload) {
    return {
        type: USER_NEW_SCORE_RESPONSE,
        payload: payload
    };
};

export const USER_NEW_SCORE_ERROR = "USER_NEW_SCORE_ERROR";
export function scoreError(payload) {
    return {
        type: USER_NEW_SCORE_ERROR,
        payload: payload
    };
};

