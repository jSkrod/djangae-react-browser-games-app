
import React from "react";
import {Component} from "react";
import {Divider, Grid, List} from "../../../../../node_modules/material-ui/index";
import {ListItem, ListItemText} from "../../../../../node_modules/material-ui/List/index";
import AddGame from "./AddGame";
import ManageGames from "./ManageGames"
import {addGameSelected, manageGamesSelected} from "../../../../actions/DeveloperActions";
import { connect } from 'react-redux';
const currentGameOption = (state) => {
    switch(state){
        case 'add':
            return <AddGame/>
        case 'manage':
        default:
            return <ManageGames/>
    }
}
@connect((store) =>{
    return {
        gamesAction : currentGameOption(store.developerReducer.get('currentComponent'))
    }

})
class Games extends Component{
    constructor(props){
        super(props)
        this.handleAddGameClick = this.handleAddGameClick.bind(this);
        this.handleManageGamesClick = this.handleManageGamesClick.bind(this);
    }

    handleAddGameClick(){
        this.props.dispatch(addGameSelected());
    }
    handleManageGamesClick(){
        this.props.dispatch(manageGamesSelected());
    }
    render(){
        return (
        <Grid container spacing={16}>
            <Grid item xs={2} >
                <List>
                    <ListItem button disabled={true}>
                        <ListItemText primary="Games"/>
                    </ListItem>
                    <Divider/>
                    <ListItem button >
                        <ListItemText primary="Manage your games" onClick={this.handleManageGamesClick}/>
                    </ListItem>
                    <ListItem button >
                        <ListItemText primary="Add new game" onClick={this.handleAddGameClick}/>
                    </ListItem>
                </List>
            </Grid>
            <Grid item xs={4}>
                {this.props.gamesAction}
            </Grid>
        </Grid>
        )
    }
}


export default Games;