import React from "react";
import {withStyles} from 'material-ui/styles';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import IconButton from 'material-ui/IconButton';
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList';
import PlayIcon from 'material-ui-icons/PlayArrow';
import Tooltip from 'material-ui/Tooltip';
import InsertComment from 'material-ui-icons/InsertComment';
import {getAllGames, selectGame, cancelFetchingGames} from '../../../actions/GamesActions';
import Comments from './Comments';
import { CircularProgress } from 'material-ui/Progress';
import { findDOMNode } from 'react-dom';

const styleSheet = ({
    iframe: {
        position: "relative",
        width: "100%",
        height: "calc(100% - 1px - 88px)",
        border: "0",
        top: "88px"
    },
    container: {
        position: "absolute",
        height: "100%",
        width: "100%",
        left: 0,
        top: 0
    },
    titleBar: {
        background:
          'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
          'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
      },
    
      titleWrap: {
        height: 'initial'
      }
});


@connect((store) => {
    return {
        gamesReducer: store.gamesReducer
    }
})
class GameList extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            commentsForGame: null,
            commentsIsOpen: false,
            selectedGameName: ''
        }
    }

    handleClick = (value) => {
        this.props.dispatch(selectGame(value));
        this.props.dispatch(push(`/embed/${value.get('game_name')}`));
    }

    gameElementList = {

    }

    componentDidMount() {
        this.props.dispatch(getAllGames());
    }

    componentWillUnmount() {
        this.props.dispatch(cancelFetchingGames());
    }

    gotoCommentsView(value) {
        this.setState({
            commentsForGame: findDOMNode(this.gameElementList[value.get('game_name')]),
            commentsIsOpen: true,
            selectedGameName: value.get('game_name')
        });
    }

    closeComments() {
        this.setState({
            commentsIsOpen: false
        });
    }

    render () {
        let games = this.props.gamesReducer.get('games');
        if(games){
            return (
                <div>
                    <GridList cellHeight={360} cols={4} className={this.props.classes.gridList}>
                        {games.map(game => (
                        
                        <GridListTile key={game.get("game_name")} ref={element => this.gameElementList[game.get("game_name")] = element}>
                            { <img src={game.get("image")} alt={"title"} />}
                            <GridListTileBar 
                                classes={{
                                    titleWrap: this.props.classes.titleWrap
                                }}
                                className={this.props.classes.titleBar}
                                title={game.get('rating') !== -1? game.get('rating') + '/10': ''}
                                titlePosition="top"
                                actionIcon={
                                    <Tooltip placement="bottom" title="Comments">
                                        <IconButton onClick={this.gotoCommentsView.bind(this, game)}>
                                            <InsertComment color="white" />
                                        </IconButton>
                                    </Tooltip>
                                }
                                actionPosition="left"
                            />
                            <GridListTileBar
                            onClick={() => (this.handleClick(game))}
                            title={`${game.get("title")} by: ${game.get('user')}`}
                            subtitle={<span>{game.get("description")}</span>}
                            actionIcon={
                                <IconButton onClick={() => (this.handleClick(game))}>
                            
                                <PlayIcon color="rgba(255, 255, 255, 0.54)"/>
                                </IconButton>
                            }
                            />
                        </GridListTile>
                        ))}
                    </GridList>
                    {this.state.commentsIsOpen ? <Comments forElement={this.state.commentsForGame} isOpen={this.state.commentsIsOpen} closeCallback={this.closeComments.bind(this)} gameName={this.state.selectedGameName}/>:null}
                </div>
            )
        }
        return (
           
            <CircularProgress size={50} />
        )
    }
}

export default withStyles(styleSheet)(GameList);