export const REGISTER_USER_ACTION_NAME = "REGISTER_VIEW_REGISTER_USER";
export function registerUser(username, password, email) {
    return {
        type: REGISTER_USER_ACTION_NAME,
        payload: {
            username: username,
            password: password,
            email: email
        }
    }
}

export const REGISTER_DIFFERENT_PASSWORDS_ACTION_NAME = "REGISTER_VIEW_REGISTER_USER_DIFFERENT_PASSWORDS";
export function differentPasswords() {
    return {
        type: REGISTER_DIFFERENT_PASSWORDS_ACTION_NAME,
        payload: {
        }
    }
}

export const REGISTER_SHORT_PASSWORDS_ACTION_NAME = "REGISTER_VIEW_REGISTER_USER_TOO_SHORT_PASSWORDS";
export function shortPasswords() {
    return {
        type: REGISTER_SHORT_PASSWORDS_ACTION_NAME,
        payload: {
        }
    }
}

export const REGISTER_PASSWORDS_OK_ACTION_NAME = "REGISTER_VIEW_REGISTER_USER_PASSWORDS_OK";
export function passwordsOk() {
    return {
        type: REGISTER_PASSWORDS_OK_ACTION_NAME,
        payload: {
        }
    }
}

export const REGISTER_EMAIL_OK_ACTION_NAME = "REGISTER_VIEW_REGISTER_USER_EMAIL_OK";
export function emailOk() {
    return {
        type: REGISTER_EMAIL_OK_ACTION_NAME,
        payload: {
        }
    }
}

export const REGISTER_EMAIL_ERROR_ACTION_NAME = "REGISTER_VIEW_REGISTER_USER_EMAIL_ERROR";
export function emailError() {
    return {
        type: REGISTER_EMAIL_ERROR_ACTION_NAME,
        payload: {
        }
    }
}

export const REGISTER_SHORT_USERNAME_ACTION_NAME = "REGISTER_VIEW_REGISTER_USER_TOO_SHORT_USERNAME";
export function shortUsername() {
    return {
        type: REGISTER_SHORT_USERNAME_ACTION_NAME,
        payload: {
        }
    }
}

export const REGISTER_USERNAME_OK_ACTION_NAME = "REGISTER_VIEW_REGISTER_USER_USERNAME_OK";
export function usernameOk() {
    return {
        type: REGISTER_USERNAME_OK_ACTION_NAME,
        payload: {
        }
    }
}

export const REGISTER_SERVER_RESPONSE_ACTION_NAME = "REGISTER_VIEW_REGISTER_SERVER_RESPONSE";
export function serverResponse(payload) {
    return {
        type: REGISTER_SERVER_RESPONSE_ACTION_NAME,
        payload: {
            payload
        }
    }
}

export const REGISTER_SERVER_ERROR_ACTION_NAME = "REGISTER_VIEW_REGISTER_SERVER_ERROR";
export function serverError(payload) {
    return {
        type: REGISTER_SERVER_ERROR_ACTION_NAME,
        payload: {
            payload
        }
    }
}

export const REGISTER_CANCELED_ACTION_NAME = "REGISTER_VIEW_CANCELED_REGISER";
export function canceledRegister() {
    return {
        type: REGISTER_CANCELED_ACTION_NAME,
        payload: {
        }
    }
}

export const REGISTER_COMPONENT_UNMOUNT_ACTION_NAME = "REGISTER_COMPONENT_UNMOUNT_ACTION_NAME";
export function unmountComponent() {
    return {
        type: REGISTER_COMPONENT_UNMOUNT_ACTION_NAME
    };
}

export const REGISTER_COMPONENT_CLOSE_REGISTERED_POPUP = "REGISTER_COMPONENT_CLOSE_POPUP";
export function closeRegisteredPopup () {
    return {
        type: REGISTER_COMPONENT_CLOSE_REGISTERED_POPUP
    }
}