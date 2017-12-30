import { ajax } from 'rxjs/observable/dom/ajax';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/takeUntil';
import {USER_NEW_SCORE_ACTION_NAME, scoreError, scoreResponse} from "../actions/EmbedActions";


export function sendUserScoreEpic(action$, store) {
    return action$.ofType(USER_NEW_SCORE_ACTION_NAME)
        .mergeMap(action => {
                const get_data = {
                    url: '/api/ranking/add_score',
                    method: 'POST',
                    body: {
                        value: action.payload.score,
                        game_name: action.payload.gameName,
                        user: store.getState().userReducer.get('username')
                    },
                    headers: {
                        Authorization: "Token " + store.getState().userReducer.get('token')
                    }
                };
                return ajax(get_data).map(payload => scoreResponse(payload))
                .catch(payload => [scoreError(payload)]);
            }
        );
}