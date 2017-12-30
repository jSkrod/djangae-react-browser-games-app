export const ACTIVATE_DEVELOPER_MODE_ACTION_NAME = "ACTIVATE_DEVELOPER_MODE_ACTION";
export function activateDeveloperMode () {
    return {
        type: ACTIVATE_DEVELOPER_MODE_ACTION_NAME
    }
}

export const ACTIVATE_DEVELOPER_MODE_DONE_ACTION_NAME = "ACTIVATE_DEVELOPER_MODE_DONE";
export function activateDeveloperModeDone () {
    return {
        type: ACTIVATE_DEVELOPER_MODE_DONE_ACTION_NAME
    }
}

export const ACTIVATE_DEVELOPER_MODE_ERROR_ACTION_NAME = "ACTIVATE_DEVELOPER_MODE_ERROR";
export function activateDeveloperModeError () {
    return {
        type: ACTIVATE_DEVELOPER_MODE_ERROR_ACTION_NAME
    }
}

export const USER_SETTINGS_ACTION_NAME = "USER_SETTINGS_ACTION";
export function userSettingsChosen(){
    return {
        type: USER_SETTINGS_ACTION_NAME
    }
}

export const DEVELOPER_SETTINGS_ACTION_NAME = "DEVELOPER_SETTINGS_ACTION";
export function developerSettingsChosen(){
    return {
        type: DEVELOPER_SETTINGS_ACTION_NAME
    }
}
// PASSWORD SETTINGS
export const CHANGE_PASSWORD_SELECTED_ACTION_NAME = "CHANGE_PASSWORD_SELECTED_ACTION";
export function changePasswordSelected(){
    return {
        type: CHANGE_PASSWORD_SELECTED_ACTION_NAME
    }
}
export const CHANGE_PASSWORD_ACTION_NAME = "CHANGE_PASSWORD_ACTION";
export function changePassword(old_password,new_password){
    return {
        type: CHANGE_PASSWORD_ACTION_NAME,
        payload: {
            new_password: new_password,
            old_password: old_password
        }
    }
}
export const CHANGE_PASSWORD_DONE_ACTION_NAME = "CHANGE_PASSWORD_DONE_ACTION";
export function changePasswordDone(){
    return {
        type: CHANGE_PASSWORD_DONE_ACTION_NAME
    }
}

export const CHANGE_PASSWORD_ERROR_ACTION_NAME = "CHANGE_PASSWORD_ERROR_ACTION";
export function changePasswordError(){
    return {
        type: CHANGE_PASSWORD_ERROR_ACTION_NAME
    }
}
// EMAIL SETTINGS
export const CHANGE_EMAIL_SELECTED_ACTION_NAME = "CHANGE_EMAIL_SELECTED_ACTION";
export function changeEmailSelected(){
    return {
        type: CHANGE_EMAIL_SELECTED_ACTION_NAME
    }
}
export const CHANGE_EMAIL_ACTION_NAME = "CHANGE_EMAIL_ACTION";
export function changeEmail(email){
    return {
        type: CHANGE_EMAIL_ACTION_NAME,
        payload: {
            email: email
        }
    }
}
export const CHANGE_EMAIL_DONE_ACTION_NAME = "CHANGE_EMAIL_DONE_ACTION";
export function changeEmailDone(){
    return {
        type: CHANGE_EMAIL_DONE_ACTION_NAME
    }
}

export const CHANGE_EMAIL_ERROR_ACTION_NAME = "CHANGE_PASSWORD_ERROR_ACTION";
export function changeEmailError(){
    return {
        type: CHANGE_EMAIL_ERROR_ACTION_NAME
    }
}
