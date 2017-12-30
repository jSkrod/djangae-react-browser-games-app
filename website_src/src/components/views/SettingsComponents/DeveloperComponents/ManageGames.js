import React from 'react';
import {Component} from 'react';
import {Divider} from 'material-ui/index';
import { connect } from 'react-redux';
import {getManageableGames, removeGame} from "../../../../actions/DeveloperActions"
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Create';
import IconButton from 'material-ui/IconButton';
import { push } from 'react-router-redux';

import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';

const styles = theme => ({
    root: {
        width: '100%',
    },
});
@connect((store) => {
    return {
        user: store.userReducer.get("username"),
        reducer: store.developerReducer,
    }
})
class ManageGames extends Component{
    constructor (props) {
        super(props);

        this.state = {
            removeWarningIsVisible: false
        };

        this.handleRequestCloseRemoveDialog = this.handleRequestCloseRemoveDialog.bind(this);
        this.openRemoveDialog = this.openRemoveDialog.bind(this);
        this.reuploadGame = this.reuploadGame.bind(this);
    }

    handleRequestCloseRemoveDialog(remove) {
        this.setState({
            removeWarningIsVisible: false
        });

        if (remove) {
            this.props.dispatch(removeGame(this.state.gameNameForRemove));
        }
    }

    openRemoveDialog(gameName) {
        this.setState({
            removeWarningIsVisible: true,
            gameNameForRemove: gameName
        });
    }

    reuploadGame(gameName) {
        this.props.dispatch(push('/reupload/' + gameName))
    }

    componentDidMount(){
        this.props.dispatch(getManageableGames(this.props.user));
    }

    render(){
        return(
            <div>
            <List className={this.props.classes.root}>
                <ListItem button disabled={true}>
                    <ListItemText primary="Name"/>
                </ListItem>
                <Divider/>
                {this.props.reducer.get('userGames').map(game =>(
                    <ListItem key={game.get("game_name")}>
                    
                        <ListItemText primary={game.get("title")}/>
                        <IconButton aria-label="Edit"  onClick={this.reuploadGame.bind(this, game.get("game_name"))}>
                            <EditIcon/>
                        </IconButton>
                        <IconButton aria-label="Delete" onClick={this.openRemoveDialog.bind(this, game.get("game_name"))}>
                            <DeleteIcon/>
                        </IconButton>
                    </ListItem>
                ))}
            </List>
            <Dialog open={this.state.removeWarningIsVisible} onRequestClose={this.handleRequestCloseRemoveDialog.bind(this, false)}>
                    <DialogTitle>{"Remove game?"}</DialogTitle>
                    <DialogContent className={this.props.classes.dialogContent}>
                        <DialogContentText>
                            {"Are you sure that you want to remove " + this.state.gameNameForRemove + "game?"}
                        </DialogContentText>
                        <DialogContentText className={this.props.classes.secondParagraph}>
                            You won't be able to revert this change! Once deleted game name can't be create one more time!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleRequestCloseRemoveDialog.bind(this, false)} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={this.handleRequestCloseRemoveDialog.bind(this, true)} color="primary">
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>             
            </div>
        )
    }

}

export default withStyles(styles)(ManageGames);