import { ajax } from 'rxjs/observable/dom/ajax';
import { push } from 'react-router-redux';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/takeUntil';
import {GAME_SUBMITED_ACTION_NAME,
    DEVELOPER_ADD_VIEW_WILL_UNMOUNT_ACTION_NAME,
    GET_UPLOAD_URL_DEVELOPER_ADD_GAME_ACTION_NAME,
    GET_MANAGEABLE_GAMES_ACTION_NAME,
    serverError,
    getUploadURL,
    onGetManageableGamesServerResponse,
    onServerErrorGetManageableGames,
    onGetUploadURLServerResponse,
    onServerErrorGetUploadUrl,
    getManageableGames,
    REMOVE_GAME_ACTION_NAME} from "../actions/DeveloperActions";


export function getUploadUrl(action$, store) {
    return action$.ofType(GET_UPLOAD_URL_DEVELOPER_ADD_GAME_ACTION_NAME)
        .mergeMap(action => {
                const post_data = {
                    url: '/api/user/game/get_upload_url',
                    method: 'POST',
                    body: {
                        ...action.payload
                    },
                    headers: {
                        Authorization: "Token " + store.getState().userReducer.get('token')
                    }
                };
                return ajax(post_data)
                    .map(payload => onGetUploadURLServerResponse(payload))
                    .catch(payload => [onServerErrorGetUploadUrl(payload)])
                    .takeUntil(action$.ofType(DEVELOPER_ADD_VIEW_WILL_UNMOUNT_ACTION_NAME));
            }
        );
}

export function getManageableGamesEpic(action$, store) {
    return action$.ofType(GET_MANAGEABLE_GAMES_ACTION_NAME)
        .mergeMap(action => {
                const get_data = {
                    url: `/api/list_games_user/${action.payload}`,
                    method: 'GET',
                    headers: {
                        Authorization: `Token ${store.getState().userReducer.get('token')}`
                    }
                };
                return ajax(get_data)
                    .map(payload => onGetManageableGamesServerResponse(payload))
                    .catch(payload => [onServerErrorGetManageableGames(payload)]);
                   
            }
        );
}

export function removeGame(action$, store) {
    return action$.ofType(REMOVE_GAME_ACTION_NAME)
        .mergeMap(action => {
                const get_data = {
                    url: `/api/remove_user_game/${action.payload}`,
                    method: 'GET',
                    headers: {
                        Authorization: `Token ${store.getState().userReducer.get('token')}`
                    }
                };
                return ajax(get_data)
                    .map(payload => getManageableGames(store.getState().userReducer.get('username')))
                    .catch(payload => [getManageableGames(store.getState().userReducer.get('username'))]);
                   
            }
        );
}

export function submitGame(action$, store) {
    return action$.ofType(GAME_SUBMITED_ACTION_NAME)
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
                    .takeUntil(action$.ofType(DEVELOPER_ADD_VIEW_WILL_UNMOUNT_ACTION_NAME));
            }
        );
}