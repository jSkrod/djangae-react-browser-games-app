import {combineEpics} from "redux-observable";
import { registerUser } from './RegisterEpic';
import {loginUser} from './LoginEpic';
import {activateDeveloperMode, changePassword, changeEmail} from './SettingsEpic';
import {submitGame, getUploadUrl,getManageableGamesEpic, removeGame} from './DeveloperEpic';
import {submitReuploadGame, getUploadUrlForReupload} from './ReuploadEpic';
import {getAllGames} from './GamesEpic';
import {sendComment, getComments} from './CommentEpic';
import {sendUserScoreEpic} from './EmbedEpic';
import {getRanking} from './RankingEpic';

export default combineEpics(
    loginUser,
    registerUser,
    activateDeveloperMode,
    changePassword,
    changeEmail,
    submitGame,
    getUploadUrl,
    getAllGames,
    getManageableGamesEpic,
    removeGame,
    submitReuploadGame,
    getUploadUrlForReupload,
    sendComment,
    getComments,
    sendUserScoreEpic,
    getRanking
);