import {Map} from 'immutable';
import {
    ADD_GAME_OPTION_SELECTED_ACTION_NAME,
    GAME_INSERTED_ACTION_NAME,
    GAME_SUBMITED_ACTION_NAME,
    MANAGE_GAMES_OPTION_SELECTED_ACTION_NAME,
    DEVELOPER_ADD_VIEW_WILL_UNMOUNT_ACTION_NAME,
    ON_SERVER_RESPONSE_GET_UPLOAD_URL_ACTION_NAME,
    ON_SERVER_RESPONSE_GET_MANAGEABLE_GAMES_ACTION_NAME,
    GET_UPLOAD_URL_DEVELOPER_ADD_GAME_ACTION_NAME,
    ADD_GAME_SERVER_ERROR_ACTION_NAME
} from "../actions/DeveloperActions";

function getUrlParts(url) {
    var a = document.createElement('a');
    a.href = url;

    return {
        href: a.href,
        host: a.host,
        hostname: a.hostname,
        port: a.port,
        pathname: a.pathname,
        protocol: a.protocol,
        hash: a.hash,
        search: a.search
    };
}

const initialState = Map({
    currentComponent : "manage",
    inserted: null,
    isSendingGame: false,
    addGameViewIsDisabled: true,
    userGames: [],
    uploadURL: '',

    isFileError: false,
    isImageError: false,
    isGameNameError: false,
    isTitleError: false,
    fileError: "",
    imageError: "",
    gameNameError: "",
    titleError: ""
});

export default function reducer(state=initialState,action){
    switch(action.type){
        case ADD_GAME_OPTION_SELECTED_ACTION_NAME:
            return state.merge({
                currentComponent: 'add',
            });
        case MANAGE_GAMES_OPTION_SELECTED_ACTION_NAME:
            return state.merge({
                currentComponent: 'manage',
            });
        case GAME_INSERTED_ACTION_NAME:
            return state.merge({
                inserted:  action.payload.name
            });
        case GAME_SUBMITED_ACTION_NAME:
            return state.merge({
                isSendingGame: true
            });
        case GET_UPLOAD_URL_DEVELOPER_ADD_GAME_ACTION_NAME:
            return state.merge({
                addGameViewIsDisabled: true
            });
        case DEVELOPER_ADD_VIEW_WILL_UNMOUNT_ACTION_NAME:
            return state.merge({
                addGameViewIsDisabled: true,
                isFileError: false,
                isImageError: false,
                isGameNameError: false,
                fileError: "",
                imageError: "",
                gameNameError: "",
                isSendingGame: false
            });
        case ON_SERVER_RESPONSE_GET_MANAGEABLE_GAMES_ACTION_NAME:
            return state.merge({
                userGames: action.payload.response,
            });

        case ON_SERVER_RESPONSE_GET_UPLOAD_URL_ACTION_NAME:
            return state.merge({
                addGameViewIsDisabled: false,
                uploadURL: getUrlParts(action.payload.response.url).pathname
            });
        
        case ADD_GAME_SERVER_ERROR_ACTION_NAME: 
            let isFileError = false;
            let isGameNameError = false;
            let isImageError = false;
            let isTitleError = false;

            let fileErrorString = "";
            let imageErrorString = "";
            let gameErrorString = "";
            let titleErrorString = "";

            let errorsString = {
                gameName: {
                    'required': 'Game name is required',
                    'invalid': 'Invalid game name',
                    'blank': 'Game name is empty',
                    'max_length': 'Game name is too long',
                    'min_length': 'Game name is too short',
                    'not_unique': 'This name is already used. Please select new name',
                    'only_lower_case': 'Game name can contains only lower case characters from a to z'
                }, 
                title: {
                    'required': 'Game title is required',
                    'invalid': 'Invalid game title',
                    'blank': 'Game title is empty',
                    'max_length': 'Game title is too long',
                    'min_length': 'Game title is too short',
                    'not_unique': 'This title is already used. Please select new title',
                },
                image: {
                    'required': 'Image is required',
                    'invalid': 'Image is not valid',
                    'no_name': 'Image dont have file name',
                    'empty': 'Image is empty',
                    'max_length': 'Image is too big',
                    'invalid_image': "Please select valid image"
                }, 
                file: {
                    'required': 'File is required',
                    'invalid': 'File is not valid',
                    'no_name': 'File dont have file name',
                    'empty': 'File is empty',
                    'max_length': 'File is too big',
                }
            };

            var errors = action.payload.payload.xhr.response;

            if (errors.file) {
                isFileError = true;
                fileErrorString = errorsString['file'][errors.file];
            }

            if (errors.game_name) {
                isGameNameError = true;
                gameErrorString = errorsString['gameName'][errors.game_name];

            }
            
            if (errors.image) {
                isImageError = true;
                imageErrorString = errorsString['image'][errors.image];
            }

            if (errors.title) {
                isTitleError = true;
                titleErrorString = errorsString['title'][errors.title];
            }

            return state.merge({
                isFileError: isFileError,
                isImageError: isImageError,
                isGameNameError: isGameNameError,
                isTitleError: isTitleError,

                fileError: fileErrorString,
                imageError: imageErrorString,
                gameNameError: gameErrorString,
                titleError: titleErrorString,

                isSendingGame: false
            });
        default:
            return state;
    }
}