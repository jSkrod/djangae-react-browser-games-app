import {Map} from 'immutable';
import {
    ON_SERVER_RESPONSE_GET_ALL_GAMES_ACTION_NAME,
    FILTER_GAMES_ACTION_NAME,
    GAME_SELECTED_ACTION_NAME,
} from "../actions/GamesActions.js";
import {
    GET_COMMENTS_SERVER_RESPONSE_ACTION_NAME,
    SEND_COMMENT_ACTION_NAME
} from "../actions/CommentActions";

import {
    CANCEL_GETTING_RANKING,
    GET_RANKING_ACTION_NAME,
    GET_RANKING_RESPONSE_ACTION_NAME
} from "../actions/RankingActions";

const initialState = Map({
    viewGames: false,
    genre: "all",
    games: false,
    selectedGame: "",
    comments:[],
    isFetchingComments: true,
    ranking: [],
    isFetchingRanking: false
});

export default function reducer(state=initialState,action){
    switch(action.type){
        case CANCEL_GETTING_RANKING:
            return state.merge({
                isFetchingRanking: false,
                ranking: []
            });

        case GET_RANKING_RESPONSE_ACTION_NAME:
            return state.merge({
                isFetchingRanking: false,
                ranking: action.payload.response
            });

        case GET_RANKING_ACTION_NAME:
            return state.merge({
                isFetchingRanking: true
            });

        case SEND_COMMENT_ACTION_NAME:
            return state.merge({
                isFetchingComments: true
            });
        case GAME_SELECTED_ACTION_NAME:
        return state.merge({
            selectedGame: action.payload,
        });
        case FILTER_GAMES_ACTION_NAME:
            return state.merge({
                genre: action.payload,
            });
        case ON_SERVER_RESPONSE_GET_ALL_GAMES_ACTION_NAME:
            return state.merge({
                viewGames: true,
                games: action.payload.response,
            });
        case GET_COMMENTS_SERVER_RESPONSE_ACTION_NAME:
            
            return state.merge({
                comments: action.payload.response,
                isFetchingComments: false
            });
        default:
            return state;
    }
}