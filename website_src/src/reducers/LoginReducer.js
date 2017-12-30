

import {Map} from "immutable";

import {
    LOGIN_PASSWORD_IS_NOT_VALID_ACTION_NAME, 
    LOGIN_USERNAME_IS_NOT_VALID_ACTION_NAME,
    LOGIN_USERNAME_IS_VALID_ACTION_NAME,
    LOGIN_PASSWORD_IS_VALID_ACTION_NAME,
    LOGIN_SERVER_ERROR_ACTION_NAME,
    LOGIN_BUTTON_CLICKED_ACTION_NAME} from "../actions/LoginActions";
import {LOGOUT_ACTION_NAME} from "../actions/LogoutActions";

const initialState = Map({
    passwordError: false,
    usernameError: false,

    passwordErrorMessage: "",
    usernameErrorMessage: "",

    whileLogging: false,
    loginButtonText: "Login",
});

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case LOGOUT_ACTION_NAME:
            return initialState;
        case LOGIN_USERNAME_IS_NOT_VALID_ACTION_NAME:
            return state.merge({
                usernameError: true,
                usernameErrorMessage: "Please, enter valid username"
            });

        case LOGIN_PASSWORD_IS_NOT_VALID_ACTION_NAME:
            return state.merge({
                passwordError: true,
                passwordErrorMessage: "Please, enter valid password"
            });

        case LOGIN_USERNAME_IS_VALID_ACTION_NAME:
            return state.merge({
                usernameError: false,
                usernameErrorMessage: ""
            });

        case LOGIN_PASSWORD_IS_VALID_ACTION_NAME:
            return state.merge({
                passwordError: false,
                passwordErrorMessage: ""
            });

        case LOGIN_SERVER_ERROR_ACTION_NAME:
            const errors = {
                wrong_credentials: "Login or password is wrong",
                disabled_account: "Account is disabled. Activate account at first"
            }

            let response = action.payload.payload.xhr.response;
            if (!response) {
                return state.merge({
                    usernameError: true,
                    usernameErrorMessage: "There is problem with server. Please, try again later.",
                    whileLogging: false,
                    loginButtonText: "Login"  
                });
            }

            let error_code = response.non_field_errors;

            if (error_code) {
                return state.merge({
                    usernameError: true,
                    usernameErrorMessage: errors[error_code],
                    whileLogging: false,
                    loginButtonText: "Login" 
                })                
            }

            return state.merge({
                usernameError: true,
                usernameErrorMessage: "There is problem with server. Please, try again later.",
                whileLogging: false,
                loginButtonText: "Login"  
            });
        
            case LOGIN_BUTTON_CLICKED_ACTION_NAME:
                return state.merge({
                    whileLogging: true,
                    loginButtonText: "Logging"  
                });
        default:
            return state;
    }
};