import { ajax } from 'rxjs/observable/dom/ajax';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/takeUntil';
import {GET_RANKING_ACTION_NAME, CANCEL_GETTING_RANKING, getRankingError, getRankingResponse} from "../actions/RankingActions";


export function getRanking(action$, store) {
    return action$.ofType(GET_RANKING_ACTION_NAME)
        .mergeMap(action => {
                const get_data = {
                    url: '/api/ranking/get_scores_game',
                    method: 'POST',
                    body: {
                        game_name: action.payload,
                    },
                    headers: {
                        Authorization: "Token " + store.getState().userReducer.get('token')
                    }
                };
                return ajax(get_data)
                    .map(payload => getRankingResponse(payload))
                    .catch(payload => [getRankingError(payload)])
                    .takeUntil(action$.ofType(CANCEL_GETTING_RANKING));
            }
        );
}