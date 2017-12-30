

import {Map} from "immutable";

import {LOGIN_BUTTON_CLICKED_ACTION_NAME,
        LOGIN_SERVER_RESPONSE_ACTION_NAME} from "../actions/LoginActions";

import {ACTIVATE_DEVELOPER_MODE_DONE_ACTION_NAME} from "../actions/SettingsActions";
import {LOGOUT_ACTION_NAME} from "../actions/LogoutActions";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
let loggedUser = cookies.get('loggedUser');


const initialState = Map({
    username: null,
    token: null,
    isLogged: false,
    isDeveloper: false
});

if (loggedUser) {
    loggedUser = Map(loggedUser);
}

export default function reducer(state=(loggedUser || initialState), action) {
    switch (action.type) {
        case LOGOUT_ACTION_NAME:
        cookies.remove('loggedUser');
            return initialState;
        case LOGIN_BUTTON_CLICKED_ACTION_NAME:
            return state.merge({
                username: action.payload.username
            });
        case LOGIN_SERVER_RESPONSE_ACTION_NAME:
            if (action.payload.rememberMe) {
                cookies.set('loggedUser', {
                    username: state.get('username'),
                    token: action.payload.payload.response.token,
                    isDeveloper: action.payload.payload.response.is_developer,
                    isLogged: true
                });
            }
            return state.merge({
                token: action.payload.payload.response.token,
                isDeveloper: action.payload.payload.response.is_developer,
                isLogged: true
            });
        
        case ACTIVATE_DEVELOPER_MODE_DONE_ACTION_NAME:
            return state.merge({
                isDeveloper: true
            });

        default:
            return state;
    }
};