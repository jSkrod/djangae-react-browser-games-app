import React from "react";
import {withStyles} from 'material-ui/styles';
import { connect } from 'react-redux';
import List, {
    ListItem,
    ListItemText,
} from 'material-ui/List';

import { red } from 'material-ui/colors';
import ChangePassword from './UserComponents/ChangePassword';
import Grid from 'material-ui/Grid';
import isLoggedDecorator from "../../../decorators/loggedDecorator";

import {changeEmailSelected, changePasswordSelected} from "../../../actions/SettingsActions";
import {Divider} from "../../../../node_modules/material-ui/index";
import ChangeEmail from "./UserComponents/ChangeEmail";

const styleSheet = ({
    container: {
        boxShadow: 'none',
        marginLeft: 0,
        width: "100%"
    },
    secondParagraph: {
        paddingTop: 20,
        color: red[500]
    },
    dialogContent: {
        paddingBottom: 0
    },
    nested: {
        paddingLeft: 15,
    },
});
const currentSetting = ((setting) =>{
    switch(setting){
        case 'password' :
            return <ChangePassword />
        case 'email':
        default :
            return <ChangeEmail/>;
    }
});
@isLoggedDecorator
@connect((store) => {
    return {
        userReducer: store.userReducer,
        setting: currentSetting(store.settingsReducer.get('currentSetting')),
    }
})
class UserComponent extends React.Component {
    constructor (props) {
        super(props);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
    }
    handlePasswordChange(){

        this.props.dispatch(changePasswordSelected());
    }
    handleEmailChange(){
        this.props.dispatch(changeEmailSelected());
    }

    render () {
        return (
            <div>
                <Grid container spacing={16} className={this.props.classes.container}>
                    <Grid item xs={2} >
                        <List>
                            <ListItem button disabled={true}>
                                <ListItemText primary="Change"/>
                            </ListItem>
                            <Divider/>
                            <ListItem button className={this.props.classes.nested}>
                                <ListItemText primary="Password" onClick={this.handlePasswordChange}/>
                            </ListItem>
                            <ListItem button className={this.props.classes.nested}>
                                <ListItemText primary="Email" onClick={this.handleEmailChange}/>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={4}>
                        {this.props.setting}
                    </Grid>
                </Grid>


            </div>
        )
    }
}

export default withStyles(styleSheet)(UserComponent);