import {Map} from 'immutable';

import {
    REUPLOAD_GAME_SUBMITED_ACTION_NAME,
    DEVELOPER_REUPLOAD_VIEW_WILL_UNMOUNT_ACTION_NAME,
    REUPLOAD_GAME_SERVER_ERROR_ACTION_NAME,
    GET_UPLOAD_URL_DEVELOPER_REUPLOAD_GAME_ACTION_NAME,
    ON_SERVER_RESPONSE_GET_REUPLOAD_URL_ACTION_NAME
} from "../actions/ReuploadGameActions";

const initialState = Map({
    isSendingGame: false,
    reuploadGameViewIsDisabled: true,
    uploadURL: '',

    isFileError: false,
    isImageError: false,
    fileError: "",
    imageError: "",
});

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

export default function reducer(state=initialState,action){
    switch(action.type){
        case REUPLOAD_GAME_SUBMITED_ACTION_NAME:
            return state.merge({
                isSendingGame: true
            });
        case DEVELOPER_REUPLOAD_VIEW_WILL_UNMOUNT_ACTION_NAME:
            return state.merge({
                reuploadGameViewIsDisabled: true,
                isFileError: false,
                isImageError: false,
                isGameNameError: false,
                fileError: "",
                imageError: "",
                gameNameError: "",
                isSendingGame: false
            });

        case ON_SERVER_RESPONSE_GET_REUPLOAD_URL_ACTION_NAME:
            return state.merge({
                reuploadGameViewIsDisabled: false,
                uploadURL: getUrlParts(action.payload.response.url).pathname
            });

        case REUPLOAD_GAME_SERVER_ERROR_ACTION_NAME: 
            let isFileError = false;
            let isImageError = false;

            let fileErrorString = "";
            let imageErrorString = "";

            let errorsString = {
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

            if (errors.image) {
                isImageError = true;
                imageErrorString = errorsString['image'][errors.image];
            }

            return state.merge({
                isFileError: isFileError,
                isImageError: isImageError,

                fileError: fileErrorString,
                imageError: imageErrorString,

                isSendingGame: false
            });

        case GET_UPLOAD_URL_DEVELOPER_REUPLOAD_GAME_ACTION_NAME:
            return state.merge({
                reuploadGameViewIsDisabled: true
            });
        default:
            return state;
    }
}