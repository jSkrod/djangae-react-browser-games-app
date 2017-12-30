import { ajax } from 'rxjs/observable/dom/ajax';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/takeUntil';
import {GET_ALL_GAMES_ACTION_NAME,CANCEL_FETCHING_GAMES_ACTION_NAME, onGetAllGamesServerResponse, onServerErrorGetAllGames} from "../actions/GamesActions";


export function getAllGames(action$, store) {
    return action$.ofType(GET_ALL_GAMES_ACTION_NAME)
        .mergeMap(action => {
                const get_data = {
                    url: '/api/list_games',
                    method: 'GET',
                };
                return ajax(get_data)
                    .map(payload => onGetAllGamesServerResponse(payload))
                    .catch(payload => [onServerErrorGetAllGames(payload)])
                    .takeUntil(action$.ofType(CANCEL_FETCHING_GAMES_ACTION_NAME));
            }
        );
}