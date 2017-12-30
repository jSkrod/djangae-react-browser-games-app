import { ajax } from 'rxjs/observable/dom/ajax';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/takeUntil';


import { LOGIN_BUTTON_CLICKED_ACTION_NAME, LOGIN_CANCELED_ACTION_NAME, serverResponse, serverError } from '../actions/LoginActions';

export function loginUser(action$) {
    return action$.ofType(LOGIN_BUTTON_CLICKED_ACTION_NAME)
        .mergeMap(action => {
                const post_data = {
                    url: '/api/user/login',
                    method: 'POST',
                    body: {
                        ...action.payload
                    }
                };
                return ajax(post_data)
                    .map(payload => serverResponse(payload, action.payload.rememberMe))
                    .catch(payload => [serverError(payload)])
                    .takeUntil(action$.ofType(LOGIN_CANCELED_ACTION_NAME));
            }
        );

}