import { ajax } from 'rxjs/observable/dom/ajax';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/takeUntil';


import {
    ACTIVATE_DEVELOPER_MODE_ACTION_NAME, activateDeveloperModeDone, activateDeveloperModeError,
    CHANGE_EMAIL_ACTION_NAME,changeEmailDone,changeEmailError,
    CHANGE_PASSWORD_ACTION_NAME, changePasswordDone, changePasswordError,
} from '../actions/SettingsActions';

export function changeEmail(action$,store){
    return action$.ofType(CHANGE_EMAIL_ACTION_NAME)
        .mergeMap( action =>  {
                const post_data = {
                    url: '/api/user/change_email',
                    method: 'POST',
                    body: {
                        ...action.payload,
                    },
                    headers: {
                        Authorization: "Token " + store.getState().userReducer.get('token')
                    }
                };
                return ajax(post_data)
                    .map(payload => changeEmailDone(payload))
                    .catch(payload => [changeEmailError(payload)]);
            }
        );

}

export function changePassword(action$,store){
    return action$.ofType(CHANGE_PASSWORD_ACTION_NAME)
        .mergeMap( action =>  {
            const post_data = {
                url: '/api/user/change_password',
                method: 'POST',
                body: {
                    ...action.payload,
                },
                headers: {
                    Authorization: "Token " + store.getState().userReducer.get('token')
                }
            };
            return ajax(post_data)
                .map(payload => changePasswordDone(payload))
                .catch(payload => [changePasswordError(payload)]);
            }
        );

}
export function activateDeveloperMode(action$, store) {
    return action$.ofType(ACTIVATE_DEVELOPER_MODE_ACTION_NAME)
        .mergeMap(action => {
                const post_data = {
                    url: '/api/profile/activate_developer_account',
                    method: 'GET',
                    body: {
                        ...action.payload, 
                    },
                    headers: {
                        Authorization: "Token " + store.getState().userReducer.get('token')
                    }
                };
                return ajax(post_data)
                    .map(payload => activateDeveloperModeDone(payload))
                    .catch(payload => [activateDeveloperModeError(payload)]);
            }
        );

}