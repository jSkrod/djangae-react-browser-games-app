export const LOGIN_BUTTON_CLICKED_ACTION_NAME = "LOGIN_BUTTON_CLICKED";
export function loginUser(username,password, rememberMe) {
    return {
        type: LOGIN_BUTTON_CLICKED_ACTION_NAME,
        payload: {
            username,
            password,
            rememberMe
        }
    }
}

export const LOGIN_LOGGED_FROM_COOKIES_ACTION_NAME = "LOGIN_FROM_COOKIES_ACTION_NAME";
export function loginFromCookies(username, JWT) {
    return {
        type: LOGIN_LOGGED_FROM_COOKIES_ACTION_NAME,
        payload: {
            username,
            JWT
        }
    }
}

export const LOGIN_SERVER_RESPONSE_ACTION_NAME = "LOGIN_VIEW_LOGIN_SERVER_RESPONSE";
export function serverResponse(payload, rememberMe) {
    return {
        type: LOGIN_SERVER_RESPONSE_ACTION_NAME,
        payload: {
            payload,
            rememberMe
        }
    }
}

export const LOGIN_SERVER_ERROR_ACTION_NAME = "LOGIN_VIEW_LOGIN_SERVER_ERROR";
export function serverError(payload) {
    return {
        type: LOGIN_SERVER_ERROR_ACTION_NAME,
        payload: {
            payload
        }
    }
}

export const LOGIN_CANCELED_ACTION_NAME = "LOGIN_VIEW_CANCELED_LOGIN";
export function canceledLogin() {
    return {
        type: LOGIN_CANCELED_ACTION_NAME,
        payload: {
        }
    }
}

export const LOGIN_USERNAME_IS_NOT_VALID_ACTION_NAME = "LOGIN_IS_NOT_VALID_LOGIN";
export function loginIsNotValid() {
    return {
        type: LOGIN_USERNAME_IS_NOT_VALID_ACTION_NAME
    };
};

export const LOGIN_PASSWORD_IS_NOT_VALID_ACTION_NAME = "PASSWORD_IS_NOT_VALID_LOGIN";
export function passwordIsNotValid() {
    return {
        type: LOGIN_PASSWORD_IS_NOT_VALID_ACTION_NAME
    };
};

export const LOGIN_USERNAME_IS_VALID_ACTION_NAME = "LOGIN_ACTION_NAME_IS_VALID";
export function loginIsValid () {
    return {
        type: LOGIN_USERNAME_IS_VALID_ACTION_NAME
    }
}

export const LOGIN_PASSWORD_IS_VALID_ACTION_NAME = "LOGIN_PASSWORD_IS_VALID";
export function passwordIsValid () {
    return {
        type: LOGIN_PASSWORD_IS_VALID_ACTION_NAME
    }
}