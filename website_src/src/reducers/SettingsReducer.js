import {Map} from "immutable";

import {
    USER_SETTINGS_ACTION_NAME,
    DEVELOPER_SETTINGS_ACTION_NAME,
    CHANGE_PASSWORD_SELECTED_ACTION_NAME, CHANGE_EMAIL_SELECTED_ACTION_NAME
} from "../actions/SettingsActions";



const initialState = Map({
   settingsComponent : 'user',
   currentSetting : 'password',
});

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case USER_SETTINGS_ACTION_NAME:
            return state.merge({
                settingsComponent: 'user',

            });
        case DEVELOPER_SETTINGS_ACTION_NAME:
            return state.merge({
                settingsComponent: 'developer'
            });
        case CHANGE_PASSWORD_SELECTED_ACTION_NAME:
            return state.merge({
                currentSetting : 'password',
            });
        case CHANGE_EMAIL_SELECTED_ACTION_NAME:
            return state.merge({
                currentSetting : 'email',
            });
        default:
            return state;
    }
};