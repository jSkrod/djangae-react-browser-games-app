export const ACTION_OPTIONS = {
    LOGIN: 'LOGIN',
    REGISTER: 'REGISTER',
}

export const REGISTER_OPTION_CLICKED_ACTION_NAME = "SIGN_VIEW_REGISTER_OPTION_SELECTED";
export function registerSelectClicked(){
    return {
        type: REGISTER_OPTION_CLICKED_ACTION_NAME,
        payload: {

        }
    }
}

export const LOGIN_OPTION_CLICKED_ACTION_NAME = "SIGN_VIEW_LOGIN_OPTION_SELECTED";
export function loginSelectClicked(){
    return {
        type: LOGIN_OPTION_CLICKED_ACTION_NAME,
        payload: {

        }
    }
}