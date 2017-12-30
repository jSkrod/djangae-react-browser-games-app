import { ajax } from 'rxjs/observable/dom/ajax';
import { push } from 'react-router-redux';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/takeUntil';

import {GAME_SUBMITED_ACTION_NAME,
    getUploadURL
} from "../actions/DeveloperActions";

import {REUPLOAD_GAME_SUBMITED_ACTION_NAME,
    DEVELOPER_REUPLOAD_VIEW_WILL_UNMOUNT_ACTION_NAME,
    GET_UPLOAD_URL_DEVELOPER_REUPLOAD_GAME_ACTION_NAME,
    onGetUploadURLServerResponse,
    onServerErrorGetUploadUrl,
    serverError
} from "../actions/ReuploadGameActions";

export function submitReuploadGame(action$, store) {
    return action$.ofType(REUPLOAD_GAME_SUBMITED_ACTION_NAME)
        .mergeMap(action => {
                const post_data = {
                    url: action.payload.url,
                    method: 'POST',
                    body: action.payload.data,
                    headers: {
                        Authorization: "Token " + store.getState().userReducer.get('token')
                    }
                };
                return ajax(post_data)
                    .map(payload => push('/'))
                    .catch(payload => [getUploadURL(), serverError(payload)])
                    .takeUntil(action$.ofType(DEVELOPER_REUPLOAD_VIEW_WILL_UNMOUNT_ACTION_NAME));
            }
        );
};


export function getUploadUrlForReupload(action$, store) {
    return action$.ofType(GET_UPLOAD_URL_DEVELOPER_REUPLOAD_GAME_ACTION_NAME)
        .mergeMap(action => {
                const post_data = {
                    url: '/api/user/game/reupload_get_upload_url',
                    method: 'POST',
                    body: {
                        gameName: action.payload
                    },
                    headers: {
                        Authorization: "Token " + store.getState().userReducer.get('token')
                    }
                };
                return ajax(post_data)
                    .map(payload => onGetUploadURLServerResponse(payload))
                    .catch(payload => [onServerErrorGetUploadUrl(payload)])
                    .takeUntil(action$.ofType(DEVELOPER_REUPLOAD_VIEW_WILL_UNMOUNT_ACTION_NAME));
            }
        );
};