export const GET_RANKING_ACTION_NAME = "GET_RANKING_ACTION_NAME";
export function getRanking(gameName) {
    return {
        type: GET_RANKING_ACTION_NAME,
        payload: gameName
    };
};

export const CANCEL_GETTING_RANKING = "CANCEL_GETTING_RANKING_NAME";
export function cancelGettingRanking () {
    return {
        type: CANCEL_GETTING_RANKING
    }
}

export const GET_RANKING_ERROR_ACTION_NAME = "GET_RANKING_ERROR";
export function getRankingError (payload) {
    return {
        type: GET_RANKING_ERROR_ACTION_NAME,
        payload: payload
    };
};

export const GET_RANKING_RESPONSE_ACTION_NAME = "GET_RANKING_RESPONSE";
export function getRankingResponse (payload) {
    return {
        type: GET_RANKING_RESPONSE_ACTION_NAME,
        payload: payload
    }
}