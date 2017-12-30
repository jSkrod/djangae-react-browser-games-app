import { ajax } from 'rxjs/observable/dom/ajax';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/takeUntil';
import {SEND_COMMENT_ACTION_NAME,GET_COMMENTS_ACTION_NAME, CANCEL_FETCHING_COMMENTS_ACTION_NAME,onGetCommentsServerResponse,onGetCommentsServerError,onSendCommentServerResponse,onSendCommentServerError} from "../actions/CommentActions";
import {getComments as reloadComments} from "../actions/CommentActions";

export function sendComment(action$, store) {
    return action$.ofType(SEND_COMMENT_ACTION_NAME)
        .mergeMap(action => {
                const get_data = {
                    url: '/api/comment/add',
                    method: 'POST',
                    headers: {
                        Authorization: "Token " + store.getState().userReducer.get('token')
                    },
                    body:{
                        ...action.payload,
                    }
                };
                return ajax(get_data)
                    .map(payload => onSendCommentServerResponse(payload))
                    .catch(payload => [onSendCommentServerError(payload)]);
            }
        );
}
export function getComments(action$, store) {
    return action$.ofType(GET_COMMENTS_ACTION_NAME)
        .mergeMap(action => {
                const get_data = {
                    url: '/api/comment/get',
                    method: 'POST',
                    body:{
                        ...action.payload,
                    }
                };
                return ajax(get_data)
                    .map(payload => onGetCommentsServerResponse(payload))
                    .catch(payload => [onGetCommentsServerError(payload)])
                    .takeUntil(action$.ofType(CANCEL_FETCHING_COMMENTS_ACTION_NAME));
            }
        );
}
