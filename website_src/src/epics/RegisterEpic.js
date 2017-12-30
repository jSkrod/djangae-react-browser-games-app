import { ajax } from 'rxjs/observable/dom/ajax';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/takeUntil';


import { REGISTER_USER_ACTION_NAME, REGISTER_CANCELED_ACTION_NAME, serverResponse, serverError } from '../actions/RegisterActions';

export function registerUser(action$) {
    return action$.ofType(REGISTER_USER_ACTION_NAME)
        .mergeMap(action => {
                const post_data = {
                    url: '/api/user/register',
                    method: 'POST',
                    body: {
                        ...action.payload
                    }
                };
                return ajax(post_data)
                    .map(payload => serverResponse(payload))
                    .catch(payload => [serverError(payload)])
                    .takeUntil(action$.ofType(REGISTER_CANCELED_ACTION_NAME));
            }
        );

}