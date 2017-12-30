import {Map} from "immutable";
import { REGISTER_DIFFERENT_PASSWORDS_ACTION_NAME,
    REGISTER_USER_ACTION_NAME,
    REGISTER_PASSWORDS_OK_ACTION_NAME,
    REGISTER_SHORT_PASSWORDS_ACTION_NAME,
    REGISTER_EMAIL_ERROR_ACTION_NAME,
    REGISTER_EMAIL_OK_ACTION_NAME,
    REGISTER_USERNAME_OK_ACTION_NAME,
    REGISTER_SHORT_USERNAME_ACTION_NAME,
    REGISTER_SERVER_ERROR_ACTION_NAME,
    REGISTER_COMPONENT_UNMOUNT_ACTION_NAME,
    REGISTER_SERVER_RESPONSE_ACTION_NAME,
    REGISTER_COMPONENT_CLOSE_REGISTERED_POPUP } from '../actions/RegisterActions';
    
const initialState = Map({
    passwordError: false,
    repeatPasswordError: false,
    usernameError: false,
    emailError: false,

    passwordErrorMessage: "",
    repeatPasswordErrorMessage: "",
    usernameErrorMessage: "",
    emailErrorMessage: "",

    whileRegister: false,
    registerButtonText: "Register",

    isRegistered: false,
    popupIsOpened: false
});

function getEmailError (response) {
    const errors = {
        "not_unique": "That email is used"
    };

    if (!response) {
        return null;
    }

    if (response["email"]) {
        return errors[response["email"]];
    }

    return null;
}

function getUsernameError (response) {
    const errors = {
        "not_unique": "That username is used"
    };

    if (!response) {
        return null;
    }

    if (response["username"]) {
        return errors[response["username"]];
    }

    return null;
}

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case REGISTER_DIFFERENT_PASSWORDS_ACTION_NAME: return state.merge({
            passwordError: true,
            repeatPasswordError: true,

            passwordErrorMessage: "",
            repeatPasswordErrorMessage: "Password must be equals"
        });

        case REGISTER_PASSWORDS_OK_ACTION_NAME: return state.merge({
            passwordError: false,
            repeatPasswordError: false,
        });

        case REGISTER_SHORT_PASSWORDS_ACTION_NAME: return state.merge({
            passwordError: true,
            passwordErrorMessage: "Password is too short",
        });

        case REGISTER_EMAIL_OK_ACTION_NAME: return state.merge({
            emailErrorMessage: "",
            emailError: false
        });

        case REGISTER_EMAIL_ERROR_ACTION_NAME: return state.merge({
            emailErrorMessage: "Please enter valid email",
            emailError: true
        });

        case REGISTER_SHORT_USERNAME_ACTION_NAME: return state.merge({
            usernameErrorMessage: "Username is too short",
            usernameError: true
        });

        case REGISTER_USERNAME_OK_ACTION_NAME: return state.merge({
            usernameErrorMessage: "",
            usernameError: false
        });

        case REGISTER_SERVER_ERROR_ACTION_NAME: 
            {
                let response = action.payload.payload.xhr.response;
                if (!response) {
                    return state.merge({
                        usernameError: true,
                        usernameErrorMessage: "There is problem with server. Please, try again later.",
                        whileRegister: false,
                        registerButtonText: "Register"  
                    })
                }

                return state.merge({
                    usernameErrorMessage: state.get('usernameErrorMessage') || getUsernameError(response),
                    usernameError: state.get('usernameError') || response.username,
                    emailErrorMessage: state.get('emailErrorMessage') || getEmailError(response),
                    emailError: state.get('emailError') || response.email,
                    whileRegister: false,
                    registerButtonText: "Register"
                });
            }

        case REGISTER_USER_ACTION_NAME:
            return state.merge({
                whileRegister: true,
                registerButtonText: "Registering",

            })
        
        case REGISTER_COMPONENT_UNMOUNT_ACTION_NAME:
            return initialState.merge({
                isRegistered: state.get('isRegistered'),
                popupIsOpened: state.get('popupIsOpened')
            });

        case REGISTER_SERVER_RESPONSE_ACTION_NAME:
            let isRegistered = Boolean(action.payload.payload.response.id);

            return state.merge({
                isRegistered: isRegistered,
                whileRegister: false,
                registerButtonText: "Register",
                popupIsOpened: true
            });
        
        case REGISTER_COMPONENT_CLOSE_REGISTERED_POPUP:
            return state.merge({
                popupIsOpened: false
            })

        default:
            return state;
    }
}