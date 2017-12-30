import {combineReducers} from "redux";
import { routerReducer } from 'react-router-redux'
import registerReducer from './RegisterReducer';
import loginReducer from "./LoginReducer";
import userReducer from "./UserReducer";
import settingsReducer from "./SettingsReducer";
import developerReducer from "./DeveloperReducer"
import gamesReducer from "./GamesReducer";
import reuploadReducer from "./ReuploadGameReducer";
export default combineReducers({
    routing: routerReducer,
    registerReducer,
    loginReducer,
    userReducer,
    settingsReducer,
    developerReducer,
    gamesReducer,
    reuploadReducer
});
