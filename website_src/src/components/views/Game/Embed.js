import React from "react";
import {withStyles} from 'material-ui/styles';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import axios from 'axios';
import isLoggedDecorator from '../../../decorators/loggedDecorator';
import {EmbedApplicationBar} from '../../EmbedApplicationBar';
import {sendUserScore} from '../../../actions/EmbedActions';
import Button from 'material-ui/Button';
import { push } from 'react-router-redux';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

const styleSheet = ({
    iframe: {
        position: "relative",
        width: "100%",
        height: "calc(100% - 1px)",
        border: "0",
    },

    iframeFullscreen: {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: "0",
        left: "0",
        border: "0",
        zIndex: "99999999999",
        backgroundColor: "white"
    },

    container: {
        position: "absolute",
        height: "calc(100% - 88px)",
        width: "100%",
        left: 0,
        top: 88,
        overflow:"hidden"
    }
});

@isLoggedDecorator
@connect((store) => {
    return {
        game: store.gamesReducer,
        routing: store.routing,
        userReducer: store.userReducer
    }
})
class EmbedComponent extends React.Component {
    constructor (props) {
        super(props);

        this.onPostMessageReceived = this.onPostMessageReceived.bind(this);
        this.refFunction = this.refFunction.bind(this);

        let selectedGame = this.props.game.get('selectedGame');
        let iframeURL = '';
        if (selectedGame) {
            iframeURL = selectedGame.get('game_url');
        } else {
            let self = this;
            axios.get('/game/get_info/' + this.props.match.params.gameName)
            .then(function (data) {
                self.setState({
                    iframeURL: data.data.game_url
                });
            })
            .catch(function (data) {
                self.setState({
                    isError: true
                });
            });
        }

        this.gotoGameList = this.gotoGameList.bind(this);
        this.onFullscreen = this.onFullscreen.bind(this);

        this.state = {
            iframeURL: iframeURL,
            isFullscreen: false,
            fullscreenIsAvailable: false,
            isError: false
        };
    }

    iframeElement = null;

    componentWillMount() {
        window.addEventListener("message", this.onPostMessageReceived, false);
    }

    componentWillUnmount() {
        window.removeEventListener("message", this.onPostMessageReceived);
    }

    onPostMessageReceived (event) {
        let receivedMessagedDispatcher = {
            "GET_PLAYER_DATA": function (data) {
                findDOMNode(this.iframeElement).contentWindow.postMessage({
                    username: this.props.userReducer.get('username')
                },"*");
            },

            "EXIT_FULLSCREEN": function () {
                this.setState({
                    isFullscreen: false
                });
            },

            "SHOW_FULLSCREEN_BUTTON": function () {
                this.setState({
                    showFullscreenButton: true
                });
            },

            "SCORE" : function (data) {
                this.props.dispatch(sendUserScore(data.value, this.props.match.params.gameName));
            }
        };

        let data = event.data;

        if (receivedMessagedDispatcher[data.type]) {
            receivedMessagedDispatcher[data.type].call(this, data);
        }
    }

    refFunction = node => {
        this.iframeElement = node;
    };

    onFullscreen () {
        this.setState({
            isFullscreen: true
        });
    }

    gotoGameList () {
        this.props.dispatch(push('/'));
    }

    render () {

        return (
            <div>
                <EmbedApplicationBar fullscreenCallback={this.onFullscreen}
                                     showFullscreenButton={this.state.showFullscreenButton}
                                     gameName={this.props.match.params.gameName}/>
                <div className={(this.state.isFullscreen) ? '':this.props.classes.container}>
                        <iframe
                            scrolling="no"
                            frameBorder="0"
                            className={(this.state.isFullscreen) ? this.props.classes.iframeFullscreen : this.props.classes.iframe}
                            src={this.state.iframeURL !== '' ? this.state.iframeURL + "/index.html": ''} ref={this.refFunction}>
                        </iframe>
                </div>
                <Dialog open={this.state.isError} onRequestClose={this.gotoGameList}>
                        <DialogTitle>{"Game error."}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                            Game doesn't exists or is deleted.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.gotoGameList} color="primary">
                            Go to game list.
                            </Button>
                        </DialogActions>
                    </Dialog>
            </div>
        )
    }
}

export default withStyles(styleSheet)(EmbedComponent);